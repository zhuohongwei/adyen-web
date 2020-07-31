import { h, toChildArray } from 'preact';
import { CoreContext } from './CoreContext';

interface CoreProviderProps {
    loadingContext: string;
    i18n: any;
    children?: any;
}

/**
 * CoreProvider Component
 * Wraps a component delaying the render until after the i18n module is fully loaded
 */
function CoreProvider(props: CoreProviderProps) {
    const { children, i18n, loadingContext } = props;

    return <CoreContext.Provider value={{ i18n, loadingContext }}>{toChildArray(children)}</CoreContext.Provider>;
}

export default CoreProvider;
