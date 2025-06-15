import Header from "@/components/Header";
import Intro from "@/components/Intro";

import FutureGoals from "@/components/FutureGoals";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Intro />
				<Skills />
				<Experience />
				<Projects />
				<FutureGoals />
				<ContactForm />
			</main>
			<Footer />
		</>
	);
}
