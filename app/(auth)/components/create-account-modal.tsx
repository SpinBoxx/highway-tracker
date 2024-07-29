"use client";

import { createAccountAction } from "@/actions/auth/register/create-account";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import registerIllu from "@/public/illustrations/auth/register-illustration.svg";
import { createAccountSchema } from "@/schemas/auth/create-account-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

interface Props {
	setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export function CreateAccountModal({ setIsLogin }: Props) {
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
		<div>
			<div className="space-y-8 rounded-xl bg-white p-6 shadow-xl">
				<div className="relative h-56">
					<Image
						src={registerIllu}
						alt="Login illustration"
						className="mx-auto size-60"
						priority
					/>
				</div>
				<div className="space-y-2 ">
					<h1 className="flex font-semibold text-3xl">Créer un compte</h1>
					<p className="text-muted-foreground">
						Entrez vos informations pour pouvoir vous connectez à Highway
						Tracker. Le site qui permet de gérer vos déplacements sportifs.
					</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom d'utilisateur</FormLabel>
									<FormControl>
										<Input placeholder="antonio..." {...field} />
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
										<Input placeholder="..." {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="!mt-6 w-full rounded-lg">
							Créer votre compte
						</Button>
					</form>
				</Form>
				<div className="mt-4 text-center text-sm">
					Déjà un compte?{" "}
					<Button
						type="button"
						variant="ghost"
						onClick={() => setIsLogin(true)}
						className="px-0 underline"
					>
						Se connecter
					</Button>
				</div>
			</div>
		</div>
	);
}
