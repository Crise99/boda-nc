export const prerender = false;
import React from "react";
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import type { WeddingFormData } from "@config/cookies.json";

const WeddingEmail = ({
	name,
	telefono,
	passengers,
	passengerNames,
	hasFoodRestriction,
	restrictions,
	vegans,
	message,
}: WeddingFormData) => (
	<Html>
		<Head />
		<Preview>Nueva confirmación de asistencia - {name}</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={headerStyle}>
					<Heading style={heading}>¡Nueva Confirmación!</Heading>
				</Section>

				<Section style={contentStyle}>
					<Text style={infoTitle}>Detalles del Invitado</Text>
					<Hr style={divider} />

					<Text style={label}>Nombre</Text>
					<Text style={value}>{name}</Text>

					<Text style={label}>Teléfono</Text>
					<Text style={value}>{telefono}</Text>

					<Text style={label}>Número de Comensales</Text>
					<Text style={value}>{passengers}</Text>

					{passengerNames && passengerNames.length > 0 && (
						<>
							<Text style={label}>Acompañantes</Text>
							<Text style={value}>{passengerNames}</Text>
						</>
					)}

					{hasFoodRestriction === "yes" ? (
						<>
							<Text style={label}>Restricciones Alimentarias</Text>
							<Text style={value}>{restrictions}</Text>
							{parseInt(vegans) > 0 && (
								<>
									<Text style={label}>Menús Vegetarianos</Text>
									<Text style={value}>{vegans} menú(s)</Text>
								</>
							)}
						</>
					) : (
						<Text style={value}>Sin restricciones alimentarias</Text>
					)}

					{message && (
						<>
							<Text style={label}>Mensaje</Text>
							<Text style={messageStyle}>{message}</Text>
						</>
					)}
				</Section>

				<Text style={footer}>08 • 06 • 2025</Text>
				<Text style={footer}>Con amor, Nuria y Cristian</Text>
			</Container>
		</Body>
	</Html>
);

const main = {
	backgroundColor: "#faf7f5",
	fontFamily: "'Helvetica Neue', sans-serif",
};

const container = {
	margin: "0 auto",
	padding: "40px 20px",
	maxWidth: "600px",
};

const headerStyle = {
	backgroundColor: "#fff",
	padding: "30px",
	borderRadius: "8px",
	marginBottom: "20px",
	textAlign: "center" as const,
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const heading = {
	fontSize: "28px",
	color: "#9c8570",
	margin: "0",
	fontFamily: "'Playfair Display', serif",
};

const contentStyle = {
	backgroundColor: "#fff",
	padding: "30px",
	borderRadius: "8px",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const infoTitle = {
	fontSize: "20px",
	color: "#9c8570",
	marginBottom: "20px",
	textAlign: "center" as const,
	fontFamily: "'Playfair Display', serif",
};

const label = {
	fontSize: "14px",
	color: "#9c8570",
	marginBottom: "4px",
	fontWeight: "bold",
};

const value = {
	fontSize: "16px",
	color: "#4a4a4a",
	marginBottom: "20px",
	lineHeight: "1.4",
};

const messageStyle = {
	fontSize: "16px",
	color: "#4a4a4a",
	marginBottom: "20px",
	lineHeight: "1.6",
	fontStyle: "italic",
	padding: "15px",
	backgroundColor: "#faf7f5",
	borderRadius: "6px",
};

const divider = {
	borderTop: "1px solid #e6e6e6",
	margin: "20px 0",
};

const footer = {
	textAlign: "center" as const,
	color: "#9c8570",
	fontSize: "14px",
	marginTop: "20px",
	fontFamily: "'Playfair Display', serif",
};

export default WeddingEmail;
