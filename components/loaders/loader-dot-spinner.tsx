import { useEffect } from "react";

interface Props {
	text: string;
}

export default function LoaderDotSpinner({ text }: Props) {
	useEffect(() => {
		async function getLoader() {
			const { dotSpinner } = await import("ldrs");
			dotSpinner.register();
		}
		getLoader();
	}, []);
	return (
		<div className="flex items-center gap-2">
			<l-dot-spinner color="white" size="20" />
			{text}
		</div>
	);
}
