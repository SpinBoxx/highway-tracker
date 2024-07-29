"use client";

import { useState } from "react";
import { CreateAccountModal } from "../components/create-account-modal";
import { LoginModal } from "../components/login-modal";

const LoginPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div>
			{isLogin ? (
				<LoginModal setIsLogin={setIsLogin} />
			) : (
				<CreateAccountModal setIsLogin={setIsLogin} />
			)}
		</div>
	);
};

export default LoginPage;
