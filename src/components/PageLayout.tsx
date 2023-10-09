import React, { useState } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import {
    teamsLightTheme,
    FluentProvider,
    Label,
    Radio,
    RadioGroup,
    useId,
} from "@fluentui/react-components";
import { useFluentStyles } from "../context/FluentStylesContext"; 
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

interface IPageLayoutProps {
    children: any
};

enum LogoutType {
    Popup = "popup",
    Redirect = "redirect",
};

export const PageLayout = (props: IPageLayoutProps) => {
    const isAuthenticated = useIsAuthenticated();
    const [selectedLogoutType, setSelectedLogoutType] = useState<LogoutType>(LogoutType.Popup);
    const { children } = props;
    const labelId = useId("label");
    const styles = useFluentStyles();

    return (
      <>
        <FluentProvider className={styles.provider} theme={teamsLightTheme}>
            <nav>
                <section>
                    <Label id={labelId}>Choose authentication procedure:</Label>
                    <RadioGroup>
                        <Radio
                        label="Popup"
                        value={LogoutType.Popup}
                        checked={selectedLogoutType === LogoutType.Popup}
                        onChange={() => setSelectedLogoutType(LogoutType.Popup)}
                        />
                        <Radio
                        label="Redirect"
                        value={LogoutType.Redirect}
                        checked={selectedLogoutType === LogoutType.Redirect}
                        onChange={() => setSelectedLogoutType(LogoutType.Redirect)}
                        />
                    </RadioGroup>
                </section>
                {isAuthenticated 
                    ? <SignOutButton selectedLogoutType={selectedLogoutType} /> 
                        : <SignInButton selectedLogoutType={selectedLogoutType} />}
            </nav>
            {children}
        </FluentProvider>
      </>
    );
  };