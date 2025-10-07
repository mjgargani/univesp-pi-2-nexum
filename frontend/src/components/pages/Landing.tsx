
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
		<div className="min-h-screen m-[16px]">
			<div className="flex flex-row gap-[16px] justify-center">
				{services.map((service, idx) => (
								<div
									key={idx}
									className="flex-1 bg-[var(--fg)] rounded-[16px] flex flex-col justify-start"
								>
									<img
										src={service.image}
										alt={service.title}
										className="rounded-t-[16px] w-full h-[200px] object-cover"
										draggable={false}
									/>
									<div className="p-[8px] flex flex-col flex-grow justify-start">
										<h3 className="text-[var(--text)] mb-2 text-left w-full">{service.title}</h3>
										<p className="text-[var(--text)] text-xs text-left w-full">{service.description}</p>
									</div>
								</div>
				))}
			</div>
		</div>
	);
}
