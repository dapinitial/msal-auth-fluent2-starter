import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { CompoundButton} from "@fluentui/react-components";
import { Fingerprint24Regular } from "@fluentui/react-icons";

enum LogoutType {
    Popup = "popup",
    Redirect = "redirect",
};

interface ISignInButtonProps {
    selectedLogoutType: LogoutType;
};

export default function SignInButton(props: ISignInButtonProps) {
    const { instance } = useMsal();
    const { selectedLogoutType } = props;

    const handleLogin = () => {
        if (selectedLogoutType === LogoutType.Popup) {
            instance.loginPopup(loginRequest).catch((e) => {
                console.log(e);
            });
        } else if (selectedLogoutType === LogoutType.Redirect) {
            instance.loginRedirect(loginRequest).catch((e) => {
                console.log(e);
            });
        }
    };

    return (
        <CompoundButton
            icon={<Fingerprint24Regular />}
            secondaryContent={`This will sign you in using a ${selectedLogoutType} method.`}
            onClick={handleLogin}>Sign In</CompoundButton>
    );
};