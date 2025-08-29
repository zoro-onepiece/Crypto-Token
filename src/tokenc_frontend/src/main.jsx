import ReactDOM from 'react-dom/client'
import React from 'react'
import App from "./components/App.jsx";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "../../declarations/tokenc_backend";


const init = async () => {

    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
        // User is logged in, render the app immediately
        await renderApp(authClient);
    } else {
        await authClient.login({
            identityProvider: "http://qhbym-qaaaa-aaaaa-aaafq-cai.localhost:8080/",
            onSuccess: async () => {
                await renderApp(authClient);
            },

            onError: (error) => {
                console.error("Login failed: ", error);
                const root = document.getElementById("root");
                root.innerHTML = `<p>Login failed: ${error?.message || 'Unknown error'}. <a href="javascript:location.reload()">Retry</a></p>`;
            }
        });

    }
};


async function renderApp(authClient) {
    const identity = authClient.getIdentity();

    // !!! IMPORTANT: Use the same host as your frontend canister !!!
    // The host should point to the replica, not a specific canister.
    // Using a specific canister ID (u6s2n-gx777-77774-qaaba-cai) here is likely wrong.
    const agent = new HttpAgent({
        identity,
        host: "http://127.0.0.1:8080" // Point to the local replica
    });

    // Only for local dev: fetch root key (skip this in prod)
    if (process.env.DFX_NETWORK === "local") {
        await agent.fetchRootKey();
    }

    // Create an actor for the backend canister
    const tokenActor = Actor.createActor(backend_idl, {
        agent,
        canisterId: backend_id,
    });

    // Now render the app with the actor
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App actor={tokenActor} />);
}


init();


