import type { PropsWithChildren } from "react";

const AuthLayout = (props: PropsWithChildren) => {
	return <div className="pt-10">{props.children}</div>;
};

export default AuthLayout;
