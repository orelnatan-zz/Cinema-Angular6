// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	apis: {
		movies: {
			moviesData: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.descmovie&api_key=cfe422613b250f702980a3bbf9e90716",
		},
		users: {
			usersData: "../assets/Files/Users.json",
		}
	}
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
