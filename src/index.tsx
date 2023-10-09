import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FluentStylesProvider } from "./context/FluentStylesContext";
import './index.scss';
import App from "./App";

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <MsalProvider instance={msalInstance}>
            <FluentStylesProvider>
                <App />
            </FluentStylesProvider>
        </MsalProvider>
    </StrictMode>
);