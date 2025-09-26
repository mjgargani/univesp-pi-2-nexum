
const services = [
	{
		title: 'Motor, injeção eletrônica e troca de correia',
		description:
			'O motor é o coração do seu carro e precisa de diagnósticos precisos para manter potência e eficiência. Uma equipe especializada consegue detectar falhas que passariam despercebidas, evitando danos graves e caros. A injeção eletrônica, quando bem ajustada, melhora o consumo e a performance, enquanto a troca de correias no momento certo previne quebras e paradas inesperadas.',
		image: 'https://www.oficinaveyron.com.br/template/imagens/palavras-chave/thumb/troca-de-correia-dentada.jpg',
	},
	{
		title: 'Pneus, freios, baterias e revisões preventivas',
		description:
			'Itens essenciais como pneus, freios e baterias impactam diretamente sua segurança e a do veículo. Trabalhamos com marcas de qualidade e revisões detalhadas, garantindo que cada componente esteja no seu melhor estado. As revisões preventivas ajudam a evitar imprevistos, aumentando a vida útil do carro e reduzindo custos futuros.',
		image: 'https://kmctecnologia.com/wp-content/uploads/2023/06/270-quais-sao-os-servicos-de-um-centro-automotivo.png',
	},
	{
		title: 'Pneus, freios, baterias e revisões preventivas',
		description:
			'Itens essenciais como pneus, freios e baterias impactam diretamente sua segurança e a do veículo. Trabalhamos com marcas de qualidade e revisões detalhadas, garantindo que cada componente esteja no seu melhor estado. As revisões preventivas ajudam a evitar imprevistos, aumentando a vida útil do carro e reduzindo custos futuros.',
		image: 'https://blog.imdepa.com.br/wp-content/uploads/2022/12/autopecas-variadas.jpg',
	},
];

export default function Landing() {
	return (
		<div className="min-h-screen bg-[#232a31]">
			
			<main className="flex flex-row gap-8 justify-center mt-10 px-8">
				{services.map((service, idx) => (
					<div
						key={idx}
						className="bg-[#2d343b] rounded-2xl shadow-lg p-6 max-w-xs flex flex-col items-center"
					>
						<img
							src={service.image}
							alt={service.title}
							className="rounded-xl mb-4 w-full h-44 object-cover"
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
