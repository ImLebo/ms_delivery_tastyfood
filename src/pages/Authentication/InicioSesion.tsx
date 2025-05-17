import React from "react";

const InicioSesion: React.FC = () => {

	return(
			<div className="w-full h-screen bg-inicio-pc flex">
				<div className="hidden md:block md:w-1/2 h-screen bg-img-inicio"></div>
				<div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4">
					<div className="logo-inicio w-28 h-28 img-logo md:w-44 md:h-44"></div>
						<h1 className="font-pixel text-white text-[2.5rem] text-shadow-md">TastyFood</h1>
					<div className="cursor-pointer bg-white mt-16 px-8 py-3 rounded-2xl flex items-center justify-center gap-3 hover:shadow-md transition-shadow">
						<span className="inline-block w-6 h-6 google-icon"></span>
						<p className="font-medium text-gray-700">Ingresa con Google</p>
					</div>
				</div>
			</div>
	);
};

export default InicioSesion;