import { useEffect } from "react";

export default function LoaderDotSpinner() {
	useEffect(() => {
		async function getLoader() {
			const { dotSpinner } = await import("ldrs");
			dotSpinner.register();
		}
		getLoader();
	}, []);
	return <l-dot-spinner color="white" size="20" />;
}
