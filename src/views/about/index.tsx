import React from 'react'
import PetLogo from '../../assets/logos/pet.png'
import HCLogo from '../../assets/logos/hc.png'
import UfrgsLogo from '../../assets/logos/ufrgs.png'
import Section from './section'
import DinoLogoHeader from '../../components/dino_logo_header'
import ArrowBack from '../../components/arrow_back'
import './styles.css'

const AboutUs: React.FC = () => {
	const sections = [
		{
			title: 'PET Computação',
			img: PetLogo,
			text: `\tO PET (Programa de Educação Tutorial) Computação, criado em 1988, é um grupo composto por estudantes de graduação dos cursos de Ciência da Computação e Engenharia da Computação. Coordenado pela professora Érika Cota, o projeto é formado por uma equipe diversa, voltada ao desenvolvimento individual de seus estudantes e também ao fortalecimento da comunidade acadêmica, tanto do Instituto de Informática, quanto externa e interPETs.
\tO PET Computação é baseado na Tríade Acadêmica de Ensino, Pesquisa e Extensão, e tem como objetivo providenciar a oportunidade dos membros explorarem áreas de interesse além do currículo de seus cursos.
\tOs projetos desenvolvidos pelo grupo abrangem o desenvolvimento de softwares e aplicações mobile; ministração de minicursos relacionados à computação; projetos de pesquisa e desenvolvimento de artigos acadêmicos; organização de eventos para a comunidade do Instituto, dentre outros. Também são realizados projetos em parceria com outros grupos PET da UFRGS (PETelos).`,
			footnote: `Instituto de Informática - UFRGS\nAv. Bento Gonçalves, 9500\nCampus do Vale - Prédio 43424\n2° Pavimento - Sala 201`,
		},
		{ title: 'Hospital de Clínicas', img: HCLogo },
		{ title: 'UFRGS', img: UfrgsLogo },
	]

	return (
		<div className='about_us'>
			<ArrowBack />
			<div className='card__header'>
				<DinoLogoHeader title={'Sobre Nós'} subtitle={'DinoApp'} />
			</div>
			<div className='card__content'>
				<div className='card__typography'>
					{sections.map((section, index) => (
						<Section
							title={`${section.title}`}
							ImgSrc={section.img}
							text={section.text}
							footnote={section.footnote}
							key={index}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default AboutUs
