"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
export default function ReactQueryProvider(props: PropsWithChildren) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
}
