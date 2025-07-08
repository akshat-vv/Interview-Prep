function withLoading(Component){
    return function WrappedComponent({isLoading, ...props}){
        if(isLoading){
            return <div style={{ padding: 20 }}>🔄 Loading...</div>;
        }
        return <Component {...props} />
    }
}

export default withLoading;