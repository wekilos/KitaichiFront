import React, { Suspense } from "react";
import { Route, useHistory } from "react-router-dom";
import PageLoading from "../componentsFood/PageLoading";
import { isLogin } from "../utils/index";

const Headers = React.lazy(() => import("../componentsFood/Navbar"));
const Footer = React.lazy(() => import("../componentsFood/Footer"));

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const history = useHistory();

    return (
        <Route
            {...rest}
            render={(props) => (
                <div>
                    <Suspense fallback={<PageLoading />}>
                        <Headers />
                    </Suspense>
                    <div
                        className="  p-0"
                        style={{
                            width: "90%",
                            minHeight: "80vh",
                            margin: "0 auto",
                            padding: "0px",
                        }}
                    >
                        <Component {...props} />
                    </div>
                    <Suspense fallback={<PageLoading />}>
                        <Footer />
                    </Suspense>
                </div>
            )}
        />
    );
};

export default PublicRoute;
