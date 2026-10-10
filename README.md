# Aegis

Aegis is an enterprise security assurance and attack-path platform. It maps exposure across the environment, shows the controls that protect the business, and focuses teams on the attack paths that matter now.

## Product concept

Security teams do not need more findings; they need a defensible answer to: **what should we fix first, and why?** Aegis prioritizes attack paths using exploitability, asset criticality, business context, exposure, and control coverage.

The dashboard includes:

- An assurance score and outcome-focused security metrics
- A prioritized, filterable attack-path queue
- An exposure-detail panel with correlated path signals
- Control-assurance coverage across identity, cloud, and workloads
- An attack-journey view from internet exposure to customer data

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by the local server. Create a production build with:

```bash
npm run build
```

## Interaction model

- Select an attack path in the queue to inspect its exposure.
- Filter paths by severity.
- Switch primary navigation items to reflect the current operating area.
- Use **Assign remediation** as the next action for the selected path.

## Architecture

The current implementation is a responsive client-side prototype built with React, TypeScript, and Vinext. Its data is intentionally in-memory, making it easy to replace the sample `findings` collection in `app/page.tsx` with an API-backed security-graph service later.
