
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
	}
];

export default function Landing() {
	return (
    <div className="flex flex-wrap justify-center gap-4 w-full">
      {services.map((service, idx) => (
        <div
          key={idx}
          className="flex flex-col flex-grow bg-[var(--fg)] rounded-lg overflow-hidden w-full sm:w-1/2 lg:w-1/4"
        >
          <div 
            className={`h-48 bg-no-repeat bg-cover bg-center m-4 rounded-lg`}
            style={{ backgroundImage: `url(${service.image})` }} 
            aria-label={`Imagem: ${service.title}`}
          />
          <div className="flex flex-col flex-1 justify-between p-4">
            <h3 className="text-[var(--text)] mb-2 text-left w-full font-semibold">{service.title}</h3>
            <p className="text-[var(--text)] text-sm leading-relaxed">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
	);
}
