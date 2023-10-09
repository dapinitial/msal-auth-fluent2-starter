import React, { useState } from 'react';
import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { CompoundButton } from "@fluentui/react-components";
import { CalendarMonthRegular } from "@fluentui/react-icons";
import { useFluentStyles } from "./context/FluentStylesContext"; 

const ProfileContent = () => {
    const styles = useFluentStyles();
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    function RequestProfileData() {

        /* Silently acquires an access token which is then attached 
         * to a request for MS Graph data
         */
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    }
    return (
        <>
            <p className={styles.text}>Welcome {accounts[0]?.name}</p>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <CompoundButton 
                    icon={<CalendarMonthRegular />}
                    secondaryContent={'This will request the profile information.'}
                    appearance="primary" 
                    onClick={RequestProfileData}>
                    Request Profile Information
                </CompoundButton>
            )}
        </>

    );
};

/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    const styles = useFluentStyles();
    return (
        <div>
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <p className={styles.text}>Please sign-in to see your profile information.</p>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
};