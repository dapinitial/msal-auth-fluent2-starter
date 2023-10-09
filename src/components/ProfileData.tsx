import React from "react";
import { useFluentStyles } from "../context/FluentStylesContext"; 

interface IProfileDataProps {
    graphData: {
        givenName: string;
        surname: string;
        userPrincipalName: string;
        id: number;
    };
};

export const ProfileData = (props: IProfileDataProps) => {
    const styles = useFluentStyles();
    const { graphData } = props;    
    return (
        <div className={styles.text}>
            <p><strong>First Name: </strong> {graphData.givenName}</p>
            <p><strong>Last Name: </strong> {graphData.surname}</p>
            <p><strong>Email: </strong> {graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {graphData.id}</p>
        </div>
    );
};