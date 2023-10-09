import React, { createContext, useContext } from "react";
import { FontSizes } from '@fluentui/theme';
import { 
    makeStyles, 
    shorthands, 
    teamsLightTheme, 
    tokens, 
    FluentProvider 
} from "@fluentui/react-components";

const useStyles = makeStyles({
    button: {
      marginTop: "5px",
    },
    provider: {
      ...shorthands.border("1px"),
      ...shorthands.borderRadius("5px"),
      ...shorthands.padding("40px"),
    },
    text: {
      color: tokens.colorBrandForeground2,
      fontSize: FontSizes.size42,
      lineHeight: FontSizes.size68,
      ...shorthands.border("1px"),
      ...shorthands.borderRadius("5px"),
      ...shorthands.padding("5px"),
    },
});

const FluentStylesContext = createContext<any>(null);

export const FluentStylesProvider = (props: { children: any }) => {
    const styles = useStyles();
    const { children } = props;
    return (
        <FluentStylesContext.Provider value={styles}>
            <FluentProvider theme={teamsLightTheme}>
                {children}
            </FluentProvider>
        </FluentStylesContext.Provider>
    );
};

export const useFluentStyles = () => useContext(FluentStylesContext);