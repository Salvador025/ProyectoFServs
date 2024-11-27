export const paths = {
	"/auth/signup": {
		post: {
			description: "register new user",
			tags: ["Auth"],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/User",
						},
					},
				},
			},
			responses: {
				"200": {
					description: "new user registered successfully",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/User",
							},
						},
					},
				},
			},
		},
	},
	"/auth/login": {
		post: {
			description: "user login",
			tags: ["Auth"],
			requestBody: {
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								email: {
									type: "string",
									format: "email",
								},
								password: {
									type: "string",
								},
							},
						},
					},
				},
			},
			responses: {
				"200": {
					description: "authentication token",
					content: {
						"application/json": {
							schema: {
								properties: {
									token: {
										type: "string",
									},
								},
							},
						},
					},
				},
				"400": {
					description: "bad request (missing parameter)",
				},
				"401": {
					description: "unauthorized (wrong credentials)",
				},
			},
		},
	},
	"/auth/me": {
		get: {
			description: "get current user",
			tags: ["Auth"],
			security: [
				{
					// @ts-ignore
					bearerAuth: [],
				},
			],
			responses: {
				"200": {
					description: "current user",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/User",
							},
						},
					},
				},
				"401": {
					description: "unauthorized",
				},
			},
		},
	},
	"/boards": {
		get: {
			summary: "All boards",
			tags: ["boards"],
			description: "Get all boards",
		},
		post: {
			description: "create new board",
			tags: ["boards"],
			responses: {
				"200": {
					description: "new user registered successfully",
				},
			},
		},
	},
	"/boards/{username}": {
		get: {
			summary: "User boards",
			tags: ["boards"],
			description: "Get all boards of a user",
		},
	},
	"/boards/{username}/{name}": {
		get: {
			summary: "Board",
			tags: ["boards"],
			description: "Get board by name",
		},
	},
	"/boards/{name}": {
		put: {
			description: "update board",
			tags: ["boards"],
			responses: {
				"200": {
					description: "board updated successfully",
				},
			},
		},
		delete: {
			description: "delete board",
			tags: ["boards"],
			responses: {
				"200": {
					description: "board deleted successfully",
				},
			},
		},
	},
	"/chat": {
		get: {
			summary: "Chat",
			tags: ["chat"],
			description: "Chat",
		},
	},
	"/auth/google": {
		get: {
			tags: ["Google"],
			description: "Google authentication",
			operationId: "googleAuth",
			// @ts-ignore
			parameters: [],
			responses: {
				"200": {
					description: "Google authentication initiated",
				},
			},
		},
	},
	"/auth/google/callback": {
		get: {
			summary: "Google callback",
			tags: ["Google"],
			description: "Google callback",
			security: [
				{
					// @ts-ignore
					bearerAuth: [],
				},
			],
			responses: {
				"200": {
					description: "Google callback",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									message: {
										type: "string",
										example: "Google callback",
									},
								},
							},
						},
					},
				},
				"401": {
					description: "Unauthorized",
				},
			},
		},
	},
	"/": {
		get: {
			summary: "Index route",
			tags: ["Index"],
			description: "Index route",
		},
	},
	"/marketplace": {
		get: {
			summary: "Marketplace home",
			tags: ["Marketplace"],
			description: "Marketplace home endpoint",
		},
	},
	"/marketplace/{username}": {
		get: {
			summary: "Get the boards of a specific user",
			tags: ["Marketplace"],
			description: "Get a specific board",
		},
	},
	"/marketplace/{username}/{name}": {
		get: {
			summary: "Get a specific board",
			tags: ["Marketplace"],
			description: "Get a specific board",
		},
	},
	"/profile": {
		get: {
			summary: "Profile page",
			tags: ["Settings"],
			description: "Profile page of the user",
			responses: {
				"200": {
					description: "Profile page",
				},
			},
		},
		put: {
			summary: "Update profile",
			tags: ["Settings"],
			description: "Update profile",
			responses: {
				"200": {
					description: "Profile updated",
				},
			},
		},
		delete: {
			summary: "Delete profile",
			tags: ["Settings"],
			description: "Delete profile",
			responses: {
				"200": {
					description: "Profile deleted",
				},
			},
		},
	},
	"/profile/uploadProfilePicture": {
		put: {
			summary: "Upload profile picture",
			tags: ["Settings"],
			description: "Upload profile picture",
			parameters: [
				{
					in: "path",
					name: "username",
					required: true,
					description: "The username of the user",
					schema: {
						type: "string",
					},
				},
			],
			responses: {
				"200": {
					description: "Profile picture uploaded",
				},
			},
		},
	},
	"/settings/updateRole": {
		put: {
			summary: "Update user role",
			tags: ["Settings"],
			description: "Update user role",
			parameters: [
				{
					in: "path",
					name: "username",
					required: true,
					description: "The username of the user",
					schema: {
						type: "string",
					},
				},
				{
					in: "path",
					name: "role",
					required: true,
					description: "The role of the user",
					schema: {
						type: "string",
					},
				},
			],
			responses: {
				"200": {
					description: "Role updated",
				},
			},
		},
	},
	"/home": {
		get: {
			summary: "Home page",
			tags: ["Views"],
			description: "Home page view",
		},
	},
	"/settings": {
		get: {
			summary: "Settings page",
			tags: ["Views"],
			description: "Settings page view",
		},
	},
	"/frontCallback/{token}": {
		get: {
			summary: "Front callback",
			tags: ["Views"],
			description: "Front callback",
			parameters: [
				{
					in: "path",
					name: "token",
					required: true,
					description: "The token",
					schema: {
						type: "string",
					},
				},
			],
			responses: {
				"200": {
					description: "Front callback",
				},
			},
		},
	},
	"/play": {
		get: {
			summary: "Play",
			tags: ["Views"],
			description: "Play endpoint",
		},
	},
	"/createBoard": {
		get: {
			summary: "Create board",
			tags: ["Views"],
			description: "Create board endpoint",
		},
	},
};
