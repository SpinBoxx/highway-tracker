import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
	extends: ["@commitlint/config-angular"],
	rules: {
		"type-case": [2, "always", "upper-case"],
		"subject-max-length": [2, "always", 150],
		"header-max-length": [2, "always", 150],
		"type-enum": [
			2,
			"always",
			[
				"BUILD",
				"CHORE",
				"CI",
				"DOCS",
				"FEAT",
				"FIX",
				"PERF",
				"REFACTOR",
				"REVERT",
				"STYLE",
				"TEST",
			],
		],
		"subject-case": [2, "always", "sentence-case"],
	},
	// ...
};

export default Configuration;
