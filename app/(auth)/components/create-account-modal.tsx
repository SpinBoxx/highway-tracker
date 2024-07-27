"use client";

import Link from "next/link";

import { createAccountAction } from "@/actions/auth/register/create-account";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAccountSchema } from "@/schemas/auth/create-account-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function CreateAccountModal() {
	const form = useForm<z.infer<typeof createAccountSchema>>({
		resolver: zodResolver(createAccountSchema),
	});

	const { execute, result } = useAction(createAccountAction, {
		onSuccess: (response) => {
			if (response.data?.successMessage) {
				toast.success(response.data.successMessage);
			}
		},
		onError: (error) => {
			toast.error(error.error.serverError);
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof createAccountSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		execute(values);
	}

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="flex text-xl">Créer un compte</CardTitle>
				<CardDescription>
					Entrez vos informations pour pouvoir créer votre compte.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mot de passe</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Créer votre compte</Button>
					</form>
				</Form>
				<div className="mt-4 text-center text-sm">
					Déjà un compte?{" "}
					<Link href="#" className="underline">
						Se connecter
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
