-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2025 a las 23:21:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbdiabetes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comidas`
--

CREATE TABLE `comidas` (
  `idUsuario` int(255) NOT NULL,
  `fecha` date NOT NULL,
  `glucosa_pre` int(11) DEFAULT NULL,
  `glucosa_post` int(11) DEFAULT NULL,
  `racion` int(11) DEFAULT NULL,
  `insulina` int(11) DEFAULT NULL,
  `tipoComida` enum('Desayuno','Comida','Cena','Aperitivo','Merienda') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `controlglucosa`
--

CREATE TABLE `controlglucosa` (
  `idUsuario` int(255) NOT NULL,
  `fecha` date NOT NULL,
  `lenta` tinyint(1) DEFAULT NULL,
  `deporte` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `controlglucosa`
--

INSERT INTO `controlglucosa` (`idUsuario`, `fecha`, `lenta`, `deporte`) VALUES
(1, '2025-02-27', 7, 3),
(1, '2025-03-15', 8, 2),
(1, '2025-03-16', 7, 1),
(1, '2025-03-17', 9, 0),
(1, '2025-03-18', 6, 3),
(1, '2025-03-19', 10, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hiper`
--

CREATE TABLE `hiper` (
  `idUsuario` int(255) NOT NULL,
  `fecha` date NOT NULL,
  `tipoComida` enum('Desayuno','Comida','Cena','Aperitivo','Merienda') NOT NULL,
  `hora` time DEFAULT NULL,
  `glucosa` int(11) DEFAULT NULL,
  `correccion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hipo`
--

CREATE TABLE `hipo` (
  `idUsuario` int(255) NOT NULL,
  `fecha` date NOT NULL,
  `tipoComida` enum('Desayuno','Comida','Cena','Aperitivo','Merienda') NOT NULL,
  `hora` time DEFAULT NULL,
  `glucosa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `fechaNac` date DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `fechaNac`, `username`, `password`) VALUES
(1, 'Pepe', 'Rubiales', '2025-02-27', 'marinagogu', '$2y$10$lKD2FRqpZAHCaXSZNaldf.9M/GKz6307lHdXvfSyiREdJujzcEECG'),
(10, 'Marina', 'González', '2024-03-03', 'marinagogu', '$2y$10$JPvY4zVOBqRZDhRpAw1e7eEvD3/83VQ4HgTbcYYbD1AvSwsMbmtSK'),
(11, 'Irenenina', 'Suarez', '2025-01-07', 'ires', '$2y$10$aSVDiZMQA2oP2nDos2WZG.tD3df6aO2a9wDhDR.VyF6T2lwZDZ/Xi'),
(12, 'Irene', 'Suarez', '2025-01-07', 'ires', '$2y$10$uI/BTocNrLytucDu/41YG.sT7MWNsKXrzg.DcQoI.DlddKv3HIaCe'),
(13, 'Ursula', 'Gutierrez', '2025-12-22', 'ursuguti', '$2y$10$Iy8Mmm8Qy2tTp87PhTPVT.Kp5KREDNww9kiRddkMt26UB4K0OpZf6'),
(15, 'Laura', 'Vallejo', '2022-10-18', 'lauravalle', '$2y$10$iQHE./XOQceS7i.dXsrzDeP6Z2LDo4VeMnljfuDT5qIqlKQ0oHyGC'),
(16, 'Saul', 'Maldonado', '2025-03-02', 'saulmaldo', '$2y$10$VV.9zrNtPcY3QAj3ThMwIu9Z8bCFEHns/QO.D1/mhe/q1mfyDPlX2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comidas`
--
ALTER TABLE `comidas`
  ADD PRIMARY KEY (`idUsuario`,`fecha`,`tipoComida`);

--
-- Indices de la tabla `controlglucosa`
--
ALTER TABLE `controlglucosa`
  ADD PRIMARY KEY (`idUsuario`,`fecha`);

--
-- Indices de la tabla `hiper`
--
ALTER TABLE `hiper`
  ADD PRIMARY KEY (`idUsuario`,`fecha`,`tipoComida`);

--
-- Indices de la tabla `hipo`
--
ALTER TABLE `hipo`
  ADD PRIMARY KEY (`idUsuario`,`fecha`,`tipoComida`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comidas`
--
ALTER TABLE `comidas`
  ADD CONSTRAINT `comidas_ibfk_1` FOREIGN KEY (`idUsuario`,`fecha`) REFERENCES `controlglucosa` (`idUsuario`, `fecha`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `controlglucosa`
--
ALTER TABLE `controlglucosa`
  ADD CONSTRAINT `controlglucosa_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hiper`
--
ALTER TABLE `hiper`
  ADD CONSTRAINT `hiper_ibfk_1` FOREIGN KEY (`idUsuario`,`fecha`,`tipoComida`) REFERENCES `comidas` (`idUsuario`, `fecha`, `tipoComida`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hipo`
--
ALTER TABLE `hipo`
  ADD CONSTRAINT `hipo_ibfk_1` FOREIGN KEY (`idUsuario`,`fecha`,`tipoComida`) REFERENCES `comidas` (`idUsuario`, `fecha`, `tipoComida`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
