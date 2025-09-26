
import Logo from '../atoms/Logo';

const services = [
	{
		title: 'Motor, injeção eletrônica e troca de correia',
		description:
			'O motor é o coração do seu carro e precisa de diagnósticos precisos para manter potência e eficiência. Uma equipe especializada consegue detectar falhas que passariam despercebidas, evitando danos graves e caros. A injeção eletrônica, quando bem ajustada, melhora o consumo e a performance, enquanto a troca de correias no momento certo previne quebras e paradas inesperadas.',
		image: 'https://cdn.pixabay.com/photo/2016/03/27/21/39/auto-1281675_1280.jpg',
	},
	{
		title: 'Pneus, freios, baterias e revisões preventivas',
		description:
			'Itens essenciais como pneus, freios e baterias impactam diretamente sua segurança e a do veículo. Trabalhamos com marcas de qualidade e revisões detalhadas, garantindo que cada componente esteja no seu melhor estado. As revisões preventivas ajudam a evitar imprevistos, aumentando a vida útil do carro e reduzindo custos futuros.',
		image: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/wheel-1959385_1280.jpg',
	},
	{
		title: 'Pneus, freios, baterias e revisões preventivas',
		description:
			'Itens essenciais como pneus, freios e baterias impactam diretamente sua segurança e a do veículo. Trabalhamos com marcas de qualidade e revisões detalhadas, garantindo que cada componente esteja no seu melhor estado. As revisões preventivas ajudam a evitar imprevistos, aumentando a vida útil do carro e reduzindo custos futuros.',
		image: 'https://cdn.pixabay.com/photo/2016/11/23/00/41/auto-1853305_1280.jpg',
	},
];

export default function Landing() {
	return (
		<div className="min-h-screen bg-[#232a31]">
			<header className="flex items-center px-8 py-4 bg-[#3c5066] rounded-b-2xl">
				<Logo className="h-20 w-auto mr-6" />
				<nav className="flex gap-4 flex-1">
					<button className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]">HOME</button>
					<button className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]">QUEM SOMOS</button>
					<button className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]">SERVIÇOS</button>
					<button className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7]">CONTATO</button>
					<button className="bg-[#5c7ca6] text-white font-bold px-6 py-2 rounded-lg text-lg tracking-wide hover:bg-[#6e8bb7] ml-auto">LOGIN</button>
				</nav>
			</header>
			<main className="flex flex-row gap-8 justify-center mt-10 px-8">
				{services.map((service, idx) => (
					<div
						key={idx}
						className="bg-[#2d343b] rounded-2xl shadow-lg p-6 max-w-xs flex flex-col items-center border border-[#444c56]"
					>
						<img
							src={service.image}
							alt={service.title}
							className="rounded-xl mb-4 w-full h-44 object-cover border border-[#3c5066]"
							draggable={false}
						/>
						<h2 className="text-lg font-bold text-white mb-2 text-left w-full">{service.title}</h2>
						<p className="text-gray-200 text-sm text-left w-full">{service.description}</p>
					</div>
				))}
			</main>
		</div>
	);
}
