"use client";

import Link from "next/link";

import { loginAction } from "@/actions/auth/login/login";
import { createAccountAction } from "@/actions/auth/register/create-account";
import LoaderDotSpinner from "@/components/loaders/loader-dot-spinner";
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
import loginIllu from "@/public/illustrations/auth/login-illustration.svg";
import { createAccountSchema } from "@/schemas/auth/create-account-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

interface Props {
	setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export function LoginModal({ setIsLogin }: Props) {
	const form = useForm<z.infer<typeof createAccountSchema>>({
		resolver: zodResolver(createAccountSchema),
	});

	const [isLoginLoading, setIsLoginLoading] = useState(false);

	const router = useRouter();

	const { execute, result } = useAction(loginAction, {
		onSuccess: (response) => {
			if (response.data?.successMessage) {
				toast.success(response.data.successMessage);
				router.push("/");
			}
		},
		onError: (error) => {
			toast.error(error.error.serverError);
			setIsLoginLoading(false);
		},
	});

	function onSubmit(values: z.infer<typeof createAccountSchema>) {
		setIsLoginLoading(true);
		execute(values);
	}

	return (
		<div className="">
			<div className="space-y-8 rounded-xl bg-white p-6 shadow-xl">
				<div className="relative h-56">
					<Image
						src={loginIllu}
						alt="Login illustration"
						className="mx-auto size-60"
						priority
					/>
				</div>
				<div className="space-y-2 ">
					<h1 className="flex font-semibold text-3xl">Se connecter</h1>
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
										<Input type="password" placeholder="..." {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="!mt-6 w-full rounded-lg">
							{isLoginLoading ? (
								<LoaderDotSpinner text="Connexion en cours" />
							) : (
								"Se connecter"
							)}
						</Button>
					</form>
				</Form>
				<div className="mt-4 text-center text-sm">
					Pas de compte?{" "}
					<Button
						variant="ghost"
						onClick={() => setIsLogin(false)}
						className="px-0 underline"
					>
						Créer un compte
					</Button>
				</div>
			</div>
		</div>
	);
}
