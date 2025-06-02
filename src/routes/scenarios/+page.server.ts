
// src/routes/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as k8s from '@kubernetes/client-node';

export interface ScenarioDefinition {
    metadata: {
        name: string;
        namespace?: string;
        uid: string;
    };
    spec: {
        id: string;
        name: string;
        description: string;
        helmChart?: {
            link: string;
        };
        features: string[]
        tags: string[]
    };
    status?: {
        phase?: string;
    };
}

export const load: PageServerLoad = async () => {
    try {
        // Initialize Kubernetes client
        const kc = new k8s.KubeConfig();

        // Load config from default location (in-cluster or ~/.kube/config)
        try {
            console.log("Load from default");
            
            kc.loadFromDefault(); // Try kubeconfig first for local development
        } catch (clusterErr) {
                console.error('Failed to load kubeconfig:', { clusterErr });
            try {
                kc.loadFromCluster(); // Fall back to in-cluster config
            } catch (defaultErr) {
                console.error('Failed to load kubeconfig:', { clusterErr, defaultErr });
                throw new Error('Could not load Kubernetes configuration');
            }
        }

        // Verify configuration is loaded
        const currentContext = kc.getCurrentContext();
        if (!currentContext) {
            throw new Error('No current Kubernetes context found');
        }

        const cluster = kc.getCurrentCluster();
        if (!cluster) {
            throw new Error('No Kubernetes cluster found in configuration');
        }

        if (!cluster.server || cluster.server.includes('undefined')) {
            throw new Error(`Invalid cluster server URL: ${cluster.server}`);
        }

        console.log('Using Kubernetes cluster:', cluster.server);

        const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

        // Fetch ScenarioDefinitions from all namespaces
        const response = await k8sApi.listClusterCustomObject({
            group: 'devopsbeerer.ch',
            version: 'v1alpha1',
            plural: 'scenariodefinitions'
        });

        console.log('Response status:', response.items);
        console.log('Response body type:', typeof response.body);
        console.log('Full response body:', JSON.stringify(response.body, null, 2));


        console.log(`Found ${(response as any)?.items?.length || 0} ScenarioDefinitions`);

        if (!response) {
            return { scenarios: [] };
        }

        const bodyObj = response as any;

        if (!bodyObj.items) {
            return { scenarios: [] };
        }

        const scenarios: ScenarioDefinition[] = bodyObj.items;

        return {
            scenarios: scenarios.map((scenario) => ({
                id: scenario.spec.id,
                name: scenario.spec.name,
                description: scenario.spec.description,
                flag: 'Available',
                namespace: scenario.metadata.namespace,
                phase: scenario.status?.phase || 'Unknown',
                features: scenario.spec.features,
                tags: scenario.spec.tags
            }))
        };
    } catch (err) {
        console.error('Failed to fetch ScenarioDefinitions:', err);
        throw error(500, 'Failed to fetch scenarios from Kubernetes');
    }
};
