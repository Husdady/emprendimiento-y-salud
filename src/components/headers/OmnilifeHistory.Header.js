// React
import { Component } from "react";

// Librarys
import Head from "next/head";

// API
import { APP_NAME } from '@api/credentials'

export default class OmnilifeHistoryHeader extends Component {
	render() {
		const pageTitle = `Historia de Omnilife | ${APP_NAME}`;

		return (
			<Head>
				<meta property="og:title" content={pageTitle} />
				<meta property="og:url" content="https://emprendimientoysalud.com/historia-de-omnilife" />
				<meta name="keywords" content="Historia de Omnilife emprendimiento y salud, Amaury Vergara, Jorge Vergara, Emprendimiento y salud, emprendimiento-y-salud, Omnilife, omnilife, Seytu, seytu, Seytú, seytú, salud y belleza" />
				<meta name="description" content="Historia de Omnilife - Emprendimiento y Salud, todo lo que debes saber sobre como surgió esta empresa mexicana." />
        <title>{pageTitle}</title>
      </Head>
		)
	}
}