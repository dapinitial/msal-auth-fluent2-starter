export interface RouteInfo {
    component: React.ReactNode;
    url: string;
    title: string;
    // description: string;
    captureFileName?: string;
}

export interface IRouteGroup {
    title: string;
}

export type IRouteDetails = RouteInfo | IRouteGroup;
export type Routes = Record<string, IRouteDetails>;