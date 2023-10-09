import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { CompoundButton } from "@fluentui/react-components";
import { Fingerprint24Regular } from "@fluentui/react-icons";

enum LogoutType {
    Popup = "popup",
    Redirect = "redirect",
};

interface ISignOutButtonProps {
    selectedLogoutType: LogoutType;
};

export default function SignOutButton(props: ISignOutButtonProps) {
    const { instance } = useMsal();
    const { selectedLogoutType } = props;

    const handleLogout = () => {
        if (selectedLogoutType === LogoutType.Popup) {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/",
            });
        } else if (selectedLogoutType === LogoutType.Redirect) {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    };

    return (
        
        <CompoundButton
            icon={<Fingerprint24Regular />}
            secondaryContent={`This will sign you out using a ${selectedLogoutType} method.`}
            onClick={handleLogout}>Sign Out</CompoundButton>
    );
};