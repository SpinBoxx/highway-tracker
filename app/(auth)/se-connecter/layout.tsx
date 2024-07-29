import { getSession } from "@/actions/auth/session/get-session-action";
import { Logo } from "@/components/logo";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

const AuthLayout = async (props: PropsWithChildren) => {
	const session = await getSession();

	if (session?.user) {
		redirect("/");
	}
	return (
		<div className="px-4 pt-4">
			<Logo />
			<div className="mt-2">{props.children}</div>
		</div>
	);
};

export default AuthLayout;
