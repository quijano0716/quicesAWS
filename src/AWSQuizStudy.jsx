import { useState, useMemo } from "react";

const questions = [
  {
    "id": 1,
    "domain": "Infraestructura Global",
    "q": "Un cliente está implementando una nueva aplicación y debe elegir una región de AWS. ¿Cuál de los siguientes factores podría influir en la decisión del cliente? (Escoge dos.)",
    "opts": [
      "A) Latencia reducida a los usuarios",
      "B) La presentación de la aplicación en el idioma local",
      "C) Cumplimiento de la soberanía de datos",
      "D) Costos de enfriamiento en climas más cálidos",
      "E) Proximidad a la oficina del cliente para visitas on-site"
    ],
    "correct": [
      0,
      2
    ],
    "multi": true,
    "explanation": [
      "Los 4 factores reales para elegir región son: latencia, precio, cumplimiento legal/soberanía de datos, y disponibilidad de servicios.",
      "El idioma es programación, no infraestructura. Los costos de enfriamiento son problema de AWS. Y no necesitas visitar un data center en la nube."
    ]
  },
  {
    "id": 2,
    "domain": "Infraestructura Global",
    "q": "Las múltiples regiones de la nube de AWS son un ejemplo de:",
    "opts": [
      "A) Agilidad",
      "B) Infraestructura global",
      "C) Elasticidad",
      "D) Precios de pago por uso"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Las regiones son la columna vertebral de la infraestructura global de AWS: centros de datos distribuidos por todo el mundo.",
      "Elasticidad = escalar recursos según demanda. Agilidad = velocidad para experimentar. Pay-as-you-go = pagar solo por lo que usas."
    ]
  },
  {
    "id": 3,
    "domain": "Infraestructura Global",
    "q": "¿Qué es una zona de disponibilidad (Availability Zone) en AWS?",
    "opts": [
      "A) Uno o más centros de datos físicos",
      "B) Una ubicación geográfica completamente aislada",
      "C) Una o más ubicaciones de borde en todo el mundo",
      "D) Una ubicación de centro de datos con una sola fuente de energía y redes"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "Una Availability Zone es uno o más data centers dentro de una misma región, con energía, refrigeración y redes independientes. Cada región tiene mínimo 3.",
      "La B describe una Región (nivel geográfico superior). La C describe Edge Locations (puntos de caché para entregar contenido rápido). La D es incorrecta porque las AZ tienen redundancia, no una sola fuente."
    ]
  },
  {
    "id": 4,
    "domain": "Infraestructura Global",
    "q": "Un Cloud Practitioner desarrolla un plan de recuperación ante desastres y quiere replicar datos entre varias áreas geográficas. ¿Cuál cumple con estos requisitos?",
    "opts": [
      "A) AWS Accounts",
      "B) AWS Regions",
      "C) Availability Zones",
      "D) Edge locations"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Para disaster recovery geográfico, replicas entre Regiones (ubicaciones geográficas separadas: Virginia, São Paulo, etc.).",
      "Las Availability Zones están dentro de la misma región, un desastre regional las afectaría a todas. Las Edge Locations son puntos de caché, no almacenamiento permanente. Las cuentas son entidades administrativas."
    ]
  },
  {
    "id": 5,
    "domain": "Cómputo (EC2 Pricing)",
    "q": "¿Qué modelo de precios de Amazon EC2 puede ofrecer descuentos de hasta el 90%?",
    "opts": [
      "A) Reserved Instances",
      "B) On-Demand",
      "C) Dedicated Hosts",
      "D) Spot Instances"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Spot Instances usan capacidad sobrante de AWS con descuento hasta ~90%, pero AWS puede quitarte la instancia con 2 minutos de aviso.",
      "On-Demand: sin descuento, sin compromiso. Reserved: hasta ~72% con compromiso de 1-3 años. Dedicated Hosts: servidor físico dedicado para licencias o compliance."
    ]
  },
  {
    "id": 6,
    "domain": "Cómputo (EC2 Pricing)",
    "q": "Una instancia EC2 se ejecuta solo cuando es necesario, pero debe permanecer activa durante la duración del proceso. ¿Cuál es la opción más adecuada?",
    "opts": [
      "A) Dedicated Instances",
      "B) Spot Instances",
      "C) On-Demand Instances",
      "D) Reserved Instances"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "\"Debe permanecer activa\" descarta Spot (puede ser interrumpida). \"Solo cuando es necesario\" descarta Reserved (compromiso continuo). Dedicated es para compliance.",
      "On-Demand: pagas solo mientras corre, sin compromiso, sin riesgo de interrupción."
    ]
  },
  {
    "id": 7,
    "domain": "Cómputo (EC2 Pricing)",
    "q": "La aplicación de una empresa tiene horas de inicio y finalización flexibles. ¿Qué modelo de precios EC2 será el MÁS rentable?",
    "opts": [
      "A) On-Demand Instances",
      "B) Spot Instances",
      "C) Reserved Instances",
      "D) Dedicated Hosts"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "\"Horarios flexibles\" = tolera interrupciones = Spot. Si AWS te quita la instancia, esperas a que haya capacidad de nuevo.",
      "Contrasta con la pregunta anterior: allí NO podía interrumpirse (On-Demand). Aquí sí puede, y Spot ofrece hasta 90% de ahorro."
    ]
  },
  {
    "id": 8,
    "domain": "Cómputo (Servicios)",
    "q": "¿Cuál de los siguientes servicios se puede utilizar para ejecutar una base de datos relacional administrada por el cliente?",
    "opts": [
      "A) Amazon EC2",
      "B) Amazon Route 53",
      "C) Amazon ElastiCache",
      "D) Amazon DynamoDB"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "\"Administrada por el CLIENTE\" = Amazon EC2 (Elastic Compute Cloud), un servidor virtual donde TÚ instalas y mantienes tu propia base de datos.",
      "Si dijera \"administrada por AWS\" sería RDS (Relational Database Service). Route 53 = DNS. ElastiCache = caché en memoria (Redis/Memcached). DynamoDB = base de datos NoSQL administrada por AWS."
    ]
  },
  {
    "id": 9,
    "domain": "Cómputo (Servicios)",
    "q": "¿Qué afirmación describe mejor a Elastic Load Balancing?",
    "opts": [
      "A) Traduce un nombre de dominio en una dirección IP usando DNS",
      "B) Distribuye el tráfico entrante a través de una o más instancias EC2",
      "C) Recopila métricas en instancias EC2 conectadas",
      "D) Ajusta automáticamente la cantidad de instancias EC2"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Elastic Load Balancing reparte el tráfico entrante entre varios servidores EC2 para que ninguno se sature.",
      "La A = Route 53 (DNS). La C = CloudWatch (monitoreo). La D = Auto Scaling (ajusta cantidad de instancias según demanda)."
    ]
  },
  {
    "id": 10,
    "domain": "Cómputo (Servicios)",
    "q": "Una empresa quiere reducir el espacio de cómputo físico para ejecutar código. ¿Qué servicio permite arquitecturas sin servidor?",
    "opts": [
      "A) Amazon EC2",
      "B) AWS Lambda",
      "C) Amazon DynamoDB",
      "D) AWS CodeCommit"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "\"Sin servidor\" (serverless) = AWS Lambda. Subes tu código y AWS lo ejecuta cuando se necesite, sin que administres ningún servidor. Pagas por milisegundos de ejecución.",
      "EC2 requiere gestionar instancias. DynamoDB es base de datos NoSQL. CodeCommit es un repositorio de código como GitHub."
    ]
  },
  {
    "id": 11,
    "domain": "Almacenamiento",
    "q": "¿Qué servicio de almacenamiento se puede usar como opción de bajo costo para alojar sitios web estáticos?",
    "opts": [
      "A) Amazon Glacier",
      "B) Amazon DynamoDB",
      "C) Amazon EFS",
      "D) Amazon S3"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Amazon S3 (Simple Storage Service) es almacenamiento de objetos con función nativa de hosting de sitios web estáticos (HTML, CSS, JS servidos directamente desde un bucket).",
      "Glacier es archivo frío (acceso lento). DynamoDB es base de datos. EFS (Elastic File System) es sistema de archivos compartido por red."
    ]
  },
  {
    "id": 12,
    "domain": "Almacenamiento",
    "q": "¿Cuál de los siguientes servicios se puede utilizar para entregar video en línea con la latencia más baja posible? (Escoge dos.)",
    "opts": [
      "A) AWS Storage Gateway",
      "B) Amazon S3",
      "C) Amazon EFS",
      "D) Amazon Glacier",
      "E) Amazon CloudFront"
    ],
    "correct": [
      1,
      4
    ],
    "multi": true,
    "explanation": [
      "S3 almacena los videos. CloudFront es la Red de Distribución de Contenido (CDN) de AWS: una red de servidores por todo el mundo (Edge Locations) que guardan copias en caché. Cuando un usuario pide un video, CloudFront se lo entrega desde el punto más cercano.",
      "Storage Gateway conecta infraestructura local con AWS. EFS es sistema de archivos compartido. Glacier tiene acceso lento (minutos a horas)."
    ]
  },
  {
    "id": 13,
    "domain": "Almacenamiento",
    "q": "¿Qué servicio proporciona almacenamiento de objetos prácticamente ilimitado y de alta durabilidad?",
    "opts": [
      "A) Amazon Redshift",
      "B) Amazon EFS",
      "C) Amazon ECS",
      "D) Amazon S3"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Amazon S3 ofrece almacenamiento de objetos ilimitado con 99.999999999% de durabilidad (11 nueves).",
      "Redshift = almacén de datos analítico. EFS (Elastic File System) = sistema de archivos compartido. ECS (Elastic Container Service) = ejecutar contenedores Docker."
    ]
  },
  {
    "id": 14,
    "domain": "Almacenamiento",
    "q": "¿Qué servicio proporciona almacenamiento de archivos compartidos escalable para servidores Linux en AWS y servidores locales?",
    "opts": [
      "A) Amazon S3",
      "B) Amazon Glacier",
      "C) Amazon EBS",
      "D) Amazon EFS"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Amazon EFS (Elastic File System) es un sistema de archivos en red (protocolo NFS) que múltiples servidores Linux pueden montar como una carpeta compartida simultáneamente. \"Archivos compartidos\" + \"Linux\" = EFS.",
      "S3 es almacenamiento de objetos (no se monta como carpeta). EBS (Elastic Block Store) es un disco duro virtual para UNA sola instancia EC2. Glacier es archivo frío."
    ]
  },
  {
    "id": 15,
    "domain": "Almacenamiento",
    "q": "¿Qué servicio de AWS se debe usar para almacenamiento a largo plazo y de bajo costo de copias de seguridad?",
    "opts": [
      "A) Amazon RDS",
      "B) Amazon Glacier",
      "C) AWS Snowball",
      "D) AWS EBS"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Amazon Glacier (S3 Glacier) = archivo a largo plazo, costo muy bajo, acceso lento (minutos a horas). Ideal para backups y datos históricos.",
      "RDS = bases de datos relacionales. Snowball = dispositivo físico para migrar datos masivos. EBS = disco duro virtual para instancias EC2."
    ]
  },
  {
    "id": 16,
    "domain": "Bases de Datos",
    "q": "Una empresa busca una solución de data warehouse escalable. ¿Cuál satisface esta necesidad?",
    "opts": [
      "A) Amazon S3",
      "B) Amazon DynamoDB",
      "C) Amazon Kinesis",
      "D) Amazon Redshift"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Amazon Redshift es el data warehouse (almacén de datos) de AWS, optimizado para consultas analíticas masivas sobre datos estructurados en columnas.",
      "S3 puede ser un data lake (datos sin estructura fija), pero no un warehouse con motor analítico. DynamoDB es NoSQL transaccional. Kinesis procesa flujos de datos en tiempo real."
    ]
  },
  {
    "id": 17,
    "domain": "Bases de Datos",
    "q": "¿Qué servicio administrado de AWS se utiliza para alojar bases de datos?",
    "opts": [
      "A) AWS Batch",
      "B) AWS Artifact",
      "C) AWS Data Pipeline",
      "D) Amazon RDS"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Amazon RDS (Relational Database Service) = base de datos relacional administrada por AWS (instalación, parches, backups automáticos). Soporta MySQL, PostgreSQL, Oracle, SQL Server, MariaDB y Aurora.",
      "Batch = procesamiento por lotes. Artifact = reportes de compliance. Data Pipeline = mover y transformar datos entre servicios."
    ]
  },
  {
    "id": 18,
    "domain": "Redes",
    "q": "Servidores web en EC2 acceden a una aplicación heredada en un centro de datos corporativo. ¿Qué término describe este modelo?",
    "opts": [
      "A) Cloud-native",
      "B) Partner network",
      "C) Hybrid architecture",
      "D) Infrastructure as a service"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Recursos en AWS + recursos en tu propio data center (on-premises) = arquitectura híbrida (hybrid architecture).",
      "Cloud-native = todo en la nube. IaaS describe el tipo de servicio, no la arquitectura. Partner network = ecosistema de socios de AWS."
    ]
  },
  {
    "id": 19,
    "domain": "Redes",
    "q": "¿Qué servicio permite escalar fácilmente la conectividad entre miles de VPC?",
    "opts": [
      "A) VPC peering",
      "B) AWS Transit Gateway",
      "C) AWS Direct Connect",
      "D) AWS Global Accelerator"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Una VPC (Virtual Private Cloud) es tu red privada dentro de AWS. Transit Gateway actúa como un hub central (router) que conecta múltiples VPCs y redes locales. Escala a miles de conexiones.",
      "VPC peering solo conecta 2 VPCs entre sí (no escala). Direct Connect es un cable físico dedicado entre tu data center y AWS. Global Accelerator optimiza tráfico de usuarios finales."
    ]
  },
  {
    "id": 20,
    "domain": "Seguridad",
    "q": "¿Cuál de las siguientes entidades de IAM está asociada con Access Key ID y Secret Access Key cuando se usa AWS CLI?",
    "opts": [
      "A) IAM group",
      "B) IAM user",
      "C) IAM role",
      "D) IAM policy"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "IAM (Identity and Access Management) gestiona quién puede hacer qué en AWS. Las credenciales permanentes (Access Key ID + Secret Access Key) se crean para un IAM User.",
      "Group = agrupa Users para asignar permisos. Role = credenciales temporales (para que un servicio acceda a otro). Policy = documento JSON con reglas de permisos."
    ]
  },
  {
    "id": 21,
    "domain": "Seguridad",
    "q": "Una empresa necesita protección DDoS y asistencia de expertos de AWS durante ataques. ¿Qué servicio cumple estos requisitos?",
    "opts": [
      "A) AWS Shield Advanced",
      "B) AWS Firewall Manager",
      "C) AWS WAF",
      "D) Amazon GuardDuty"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "Un DDoS (Distributed Denial of Service) es cuando miles de computadoras envían tráfico basura para tumbar tu sitio. Shield Advanced ofrece protección avanzada + acceso al DRT (equipo de expertos humanos de AWS que te ayudan durante el ataque).",
      "WAF (Web Application Firewall) filtra contenido HTTP malicioso pero no da equipo de expertos. GuardDuty detecta amenazas analizando logs. Firewall Manager centraliza reglas de firewall."
    ]
  },
  {
    "id": 22,
    "domain": "Seguridad",
    "q": "¿Qué servicio facilita la creación de usuarios y grupos de AWS con acceso seguro a recursos, sin cargo?",
    "opts": [
      "A) AWS Direct Connect",
      "B) Amazon Connect",
      "C) AWS IAM",
      "D) AWS Firewall Manager"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "IAM (Identity and Access Management) gestiona usuarios, grupos, roles y permisos. Es completamente GRATUITO.",
      "Direct Connect = cable físico dedicado a AWS. Amazon Connect = centro de contacto virtual (call center). Firewall Manager = gestión centralizada de reglas de firewall."
    ]
  },
  {
    "id": 23,
    "domain": "Gestión y Gobernanza",
    "q": "¿Qué servicio de AWS permite administrar la infraestructura como código?",
    "opts": [
      "A) AWS CodePipeline",
      "B) AWS CodeDeploy",
      "C) AWS Direct Connect",
      "D) AWS CloudFormation"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "CloudFormation = Infrastructure as Code (IaC). Escribes un template en JSON o YAML que describe tu infraestructura, y CloudFormation la crea automáticamente. Es repetible y versionable.",
      "CodePipeline = automatiza el flujo de llevar código a producción (CI/CD). CodeDeploy = automatiza despliegues. Direct Connect = conexión de red física."
    ]
  },
  {
    "id": 24,
    "domain": "Gestión y Gobernanza",
    "q": "Un cliente necesita auditar la administración de cambios de los recursos de AWS. ¿Qué servicio debería usar?",
    "opts": [
      "A) AWS Config",
      "B) AWS Trusted Advisor",
      "C) Amazon CloudWatch",
      "D) Amazon Inspector"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "AWS Config registra el historial de configuración de tus recursos: cada cambio queda grabado con un \"antes\" y \"después\". Es para auditar cambios de configuración.",
      "CloudTrail = quién hizo qué llamada a la API y cuándo (auditoría de acciones). CloudWatch = métricas operacionales en tiempo real. Inspector = escaneo de vulnerabilidades. Trusted Advisor = recomendaciones de mejores prácticas."
    ]
  },
  {
    "id": 25,
    "domain": "Gestión y Gobernanza",
    "q": "Un informe debe mostrar: permisos de S3, si MFA está habilitada para root, y si los security groups permiten acceso irrestricto. ¿Dónde se encuentra todo esto?",
    "opts": [
      "A) Amazon QuickSight dashboard",
      "B) AWS CloudTrail trails",
      "C) AWS Trusted Advisor report",
      "D) IAM credential report"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Trusted Advisor analiza tu cuenta contra mejores prácticas en 5 áreas: costo, rendimiento, seguridad, tolerancia a fallos y límites de servicio. En seguridad revisa exactamente lo que pide la pregunta.",
      "El IAM credential report SOLO muestra credenciales de usuarios IAM. QuickSight es visualización de datos. CloudTrail registra llamadas a la API."
    ]
  },
  {
    "id": 26,
    "domain": "Soporte y Plataforma",
    "q": "¿Cuáles son formas válidas para que un cliente interactúe con servicios de AWS? (Escoge dos.)",
    "opts": [
      "A) Command line interface",
      "B) On-premises",
      "C) Software Development Kits",
      "D) Software-as-a-service",
      "E) Hybrid"
    ],
    "correct": [
      0,
      2
    ],
    "multi": true,
    "explanation": [
      "Las 3 formas de interactuar con AWS son: Management Console (interfaz web), CLI (Command Line Interface, comandos en terminal), y SDKs (Software Development Kits, librerías para programar en Python, Java, etc.).",
      "On-premises = infraestructura propia. SaaS = aplicación lista como Gmail. Hybrid = mezclar nube con infraestructura propia. Ninguna es una forma de interacción con la API de AWS."
    ]
  },
  {
    "id": 27,
    "domain": "Soporte y Plataforma",
    "q": "¿Dónde buscar software de proveedores independientes para encontrar, probar, comprar e implementar software en AWS?",
    "opts": [
      "A) AWS Marketplace",
      "B) Amazon Lumberyard",
      "C) AWS Artifact",
      "D) Amazon CloudSearch"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "AWS Marketplace es la tienda digital donde proveedores publican sus productos (imágenes de servidor, aplicaciones, contenedores). El cobro se integra con tu factura de AWS.",
      "Artifact = reportes de compliance. CloudSearch = motor de búsqueda de texto para tu app. Lumberyard era un motor de videojuegos ya discontinuado."
    ]
  },
  {
    "id": 28,
    "domain": "Soporte y Plataforma",
    "q": "¿Qué plan de AWS Support brinda revisiones arquitectónicas/operativas y acceso 24/7 a ingenieros sénior?",
    "opts": [
      "A) Basic",
      "B) Business",
      "C) Developer",
      "D) Enterprise"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Los 4 niveles: Basic (gratis, solo documentación), Developer (~29 USD/mes, email en horario laboral), Business (desde ~100 USD/mes, 24/7 por teléfono/chat), Enterprise (desde ~15.000 USD/mes, + TAM + revisiones arquitectónicas + ingenieros senior).",
      "Las revisiones arquitectónicas son exclusivas de Enterprise. TAM = Technical Account Manager, un ingeniero de AWS asignado a tu cuenta."
    ]
  },
  {
    "id": 29,
    "domain": "Soporte y Plataforma",
    "q": "¿Cuál es el mejor recurso para encontrar información e informes de cumplimiento (compliance) de AWS?",
    "opts": [
      "A) AWS Artifact",
      "B) AWS Marketplace",
      "C) Amazon Inspector",
      "D) AWS Support"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "AWS Artifact es el portal para descargar reportes de compliance: certificaciones SOC (controles de seguridad), PCI DSS (pagos con tarjeta), ISO 27001, HIPAA (datos de salud en EE.UU.), etc.",
      "Marketplace = tienda de software. Inspector = escaneo de vulnerabilidades. Support = soporte técnico."
    ]
  },
  {
    "id": 30,
    "domain": "Soporte y Plataforma",
    "q": "¿Qué método ayuda a optimizar costos al migrar a la nube de AWS?",
    "opts": [
      "A) Pagando solo por lo que se usa",
      "B) Comprar hardware antes de que sea necesario",
      "C) Aprovisionamiento manual de recursos",
      "D) Compra para la máxima carga posible"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "Principio fundamental de cloud: pasar de CapEx (gasto de capital grande por adelantado en hardware) a OpEx (gasto operativo variable, solo pagas lo que consumes).",
      "Las opciones B y D son el modelo antiguo on-premises: comprar para el pico máximo. La C es ineficiente; lo ideal es Auto Scaling (escalado automático)."
    ]
  },
  {
    "id": 31,
    "domain": "Gestión y Gobernanza",
    "q": "¿Qué panel de AWS muestra información relevante para ayudar a administrar eventos en curso y notificaciones proactivas para actividades programadas?",
    "opts": [
      "A) AWS Service Health Dashboard",
      "B) AWS Personal Health Dashboard",
      "C) AWS Trusted Advisor dashboard",
      "D) Amazon CloudWatch dashboard"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS Personal Health Dashboard te muestra alertas personalizadas sobre eventos de AWS que afectan específicamente a TUS recursos. Por ejemplo: \"la zona de disponibilidad donde está tu instancia tendrá mantenimiento el jueves\".",
      "El Service Health Dashboard muestra el estado general de todos los servicios de AWS para todos los clientes (no personalizado). CloudWatch monitorea métricas de tus recursos. Trusted Advisor da recomendaciones de mejores prácticas."
    ]
  },
  {
    "id": 32,
    "domain": "Almacenamiento",
    "q": "¿Qué servicio de almacenamiento híbrido de AWS permite que las aplicaciones locales (on-premises) utilicen almacenamiento en la nube?",
    "opts": [
      "A) AWS Backup",
      "B) Amazon Connect",
      "C) AWS Direct Connect",
      "D) AWS Storage Gateway"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "AWS Storage Gateway es un puente entre tu infraestructura local y el almacenamiento en la nube de AWS. Instalas un software o dispositivo virtual en tu data center que se conecta a S3, Glacier u otros servicios de almacenamiento. Tus aplicaciones locales lo ven como almacenamiento normal, pero los datos están en la nube.",
      "AWS Backup es un servicio para centralizar y automatizar backups. Amazon Connect es un call center virtual. Direct Connect es un cable físico dedicado (red, no almacenamiento)."
    ]
  },
  {
    "id": 33,
    "domain": "Redes",
    "q": "¿Cuál actúa como un firewall virtual a nivel de instancia EC2 para controlar el tráfico?",
    "opts": [
      "A) Access keys",
      "B) Virtual private gateways",
      "C) Security groups",
      "D) Access Control Lists (ACL)"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Los Security Groups (grupos de seguridad) son firewalls virtuales que controlan qué tráfico puede ENTRAR y SALIR de una instancia EC2 específica. Funcionan a nivel de instancia. Por defecto bloquean todo el tráfico de entrada y permiten todo el de salida.",
      "Las ACL (Access Control Lists) de red también filtran tráfico, pero operan a nivel de subred (afectan a todas las instancias dentro de esa subred), no a nivel de instancia individual. Access keys son credenciales de autenticación. Virtual private gateways conectan tu VPC con redes externas."
    ]
  },
  {
    "id": 34,
    "domain": "Redes",
    "q": "¿Cuál es la forma más eficiente de establecer conectividad de red desde instalaciones locales a varias VPC en diferentes regiones de AWS?",
    "opts": [
      "A) AWS Direct Connect",
      "B) AWS VPN",
      "C) AWS Client VPN",
      "D) AWS Transit Gateway"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Transit Gateway actúa como hub central que conecta tu red local con múltiples VPC (Virtual Private Cloud, tu red privada en AWS) en diferentes regiones. Una sola conexión al Transit Gateway te da acceso a todas las VPCs.",
      "Direct Connect es un cable físico que te conecta a AWS, pero por sí solo no resuelve la conectividad a múltiples VPCs en diferentes regiones de forma eficiente. VPN y Client VPN crean túneles cifrados por internet pero no escalan bien a múltiples regiones."
    ]
  },
  {
    "id": 35,
    "domain": "Seguridad",
    "q": "¿Qué servicio o característica restringe los servicios, recursos y acciones de API que pueden usar los usuarios y roles en cada cuenta miembro?",
    "opts": [
      "A) Amazon Cognito",
      "B) AWS Organizations",
      "C) AWS Shield",
      "D) AWS Firewall Manager"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS Organizations permite administrar múltiples cuentas de AWS de forma centralizada. Usa SCPs (Service Control Policies, Políticas de Control de Servicio) para definir qué servicios y acciones están permitidos en cada cuenta miembro. Por ejemplo: \"la cuenta de desarrollo no puede crear instancias de tipo x1.32xlarge\".",
      "Cognito gestiona autenticación de usuarios para tus aplicaciones (login de usuarios finales). Shield protege contra ataques DDoS. Firewall Manager centraliza reglas de firewall."
    ]
  },
  {
    "id": 36,
    "domain": "Almacenamiento",
    "q": "¿Qué clase de almacenamiento de Amazon S3 está optimizada para datos con requisitos de resiliencia más bajos pero acceso rápido, como copias de seguridad duplicadas?",
    "opts": [
      "A) Amazon S3 Standard",
      "B) Amazon S3 Glacier Deep Archive",
      "C) Amazon S3 One Zone-Infrequent Access",
      "D) Amazon S3 Glacier"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "S3 tiene varias clases de almacenamiento con diferente precio y resiliencia. S3 One Zone-Infrequent Access (One Zone-IA) almacena datos en UNA sola zona de disponibilidad (en vez de 3 como S3 Standard), lo que reduce el costo. Si pierdes esa zona, pierdes los datos, pero para copias de seguridad duplicadas (que ya tienes respaldadas en otro lugar) eso es aceptable.",
      "S3 Standard replica en 3+ zonas (máxima resiliencia). Glacier y Glacier Deep Archive son para archivo a largo plazo con acceso lento (horas o hasta 12 horas)."
    ]
  },
  {
    "id": 37,
    "domain": "Gestión y Gobernanza",
    "q": "¿Qué servicios de AWS se pueden utilizar como herramientas de automatización de infraestructura? (Escoge dos.)",
    "opts": [
      "A) AWS CloudFormation",
      "B) Amazon CloudFront",
      "C) AWS Batch",
      "D) AWS OpsWorks",
      "E) Amazon QuickSight"
    ],
    "correct": [
      0,
      3
    ],
    "multi": true,
    "explanation": [
      "CloudFormation = Infrastructure as Code, creas infraestructura completa desde templates de texto. OpsWorks es un servicio de gestión de configuración que usa Chef o Puppet (herramientas que automatizan la configuración de servidores: instalar software, configurar archivos, etc.).",
      "CloudFront es una Red de Distribución de Contenido (CDN), no automatización. Batch ejecuta trabajos de procesamiento por lotes. QuickSight es un servicio de visualización de datos e inteligencia de negocios."
    ]
  },
  {
    "id": 38,
    "domain": "Gestión y Gobernanza",
    "q": "¿Qué servicio de AWS permite crear copias de recursos en diferentes regiones?",
    "opts": [
      "A) Amazon ElastiCache",
      "B) AWS CloudFormation",
      "C) AWS CloudTrail",
      "D) AWS Systems Manager"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "CloudFormation puede ejecutar el mismo template en diferentes regiones para crear copias idénticas de tu infraestructura. Esto es clave para disaster recovery y alta disponibilidad multi-región.",
      "ElastiCache es caché en memoria (Redis/Memcached). CloudTrail registra las llamadas a la API de tu cuenta. Systems Manager ayuda a gestionar y configurar instancias EC2 y recursos on-premises."
    ]
  },
  {
    "id": 39,
    "domain": "Seguridad",
    "q": "Un usuario quiere cifrar los datos que administra AWS CloudTrail. ¿Qué servicio proporcionará esta capacidad?",
    "opts": [
      "A) AWS Secrets Manager",
      "B) AWS Systems Manager",
      "C) AWS Key Management Service (AWS KMS)",
      "D) AWS Certificate Manager"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "AWS KMS (Key Management Service) es el servicio para crear y administrar claves de cifrado. Puedes usarlo para cifrar los logs de CloudTrail, datos en S3, volúmenes EBS, y muchos otros servicios de AWS. Tú controlas quién puede usar las claves.",
      "Secrets Manager almacena secretos como contraseñas y claves de API (no crea claves de cifrado). Certificate Manager gestiona certificados SSL/TLS para HTTPS. Systems Manager gestiona configuración de instancias."
    ]
  },
  {
    "id": 40,
    "domain": "Infraestructura Global",
    "q": "¿Qué beneficio de la nube de AWS elimina la necesidad de estimar el uso futuro de infraestructura?",
    "opts": [
      "A) Implementación rápida en múltiples regiones",
      "B) Seguridad de la nube de AWS",
      "C) Elasticidad de la nube de AWS",
      "D) Menores costos variables por economías de escala"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "La elasticidad es la capacidad de escalar recursos automáticamente hacia arriba o hacia abajo según la demanda real. No necesitas adivinar cuántos servidores vas a necesitar en 6 meses: si la demanda sube, la infraestructura crece; si baja, se reduce. Esto elimina el sobreaprovisionamiento.",
      "Las otras opciones son beneficios reales de AWS, pero no resuelven el problema de estimar uso futuro."
    ]
  },
  {
    "id": 41,
    "domain": "Seguridad",
    "q": "¿Qué componentes de credenciales se requieren para acceso programático a una cuenta de AWS? (Escoge dos.)",
    "opts": [
      "A) Un Access Key ID",
      "B) Una clave primaria",
      "C) Una Secret Access Key",
      "D) Un User ID",
      "E) Una clave secundaria"
    ],
    "correct": [
      0,
      2
    ],
    "multi": true,
    "explanation": [
      "Para acceder a AWS por línea de comandos o desde código (acceso programático), necesitas dos cosas: un Access Key ID (identificador público, como un nombre de usuario) y una Secret Access Key (clave secreta, como una contraseña). Ambas se generan juntas desde IAM.",
      "Las opciones B, D y E no existen como componentes de credenciales de AWS."
    ]
  },
  {
    "id": 42,
    "domain": "Cómputo (Servicios)",
    "q": "¿Cuáles de los siguientes son servicios de cómputo de AWS? (Seleccione dos.)",
    "opts": [
      "A) Amazon Lightsail",
      "B) AWS Systems Manager",
      "C) AWS CloudFormation",
      "D) AWS Batch",
      "E) Amazon Inspector"
    ],
    "correct": [
      0,
      3
    ],
    "multi": true,
    "explanation": [
      "Amazon Lightsail es un servicio de cómputo simplificado: te da servidores virtuales, bases de datos, almacenamiento y redes preconfigurados con precio fijo mensual. Está pensado para proyectos pequeños y usuarios que no necesitan la complejidad total de EC2. AWS Batch ejecuta trabajos de procesamiento por lotes a gran escala (miles de cálculos en paralelo), lo cual es cómputo.",
      "Systems Manager gestiona configuración de instancias. CloudFormation es infraestructura como código. Inspector escanea vulnerabilidades."
    ]
  },
  {
    "id": 43,
    "domain": "Costos y Facturación",
    "q": "¿Cómo puede una empresa separar los costos de tráfico de red, EC2, S3 y otros servicios por departamento?",
    "opts": [
      "A) Agregar etiquetas específicas de departamento a cada recurso",
      "B) Crear una VPC separada para cada departamento",
      "C) Crear una cuenta de AWS separada para cada departamento",
      "D) Usar AWS Organizations"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "Las etiquetas de asignación de costos (cost allocation tags) permiten etiquetar cada recurso con metadatos como \"departamento:marketing\" o \"proyecto:web\". Luego en el reporte de facturación puedes filtrar y agrupar costos por esas etiquetas.",
      "Crear cuentas separadas también funciona pero es más complejo de administrar. Una VPC por departamento no separa costos. Organizations gestiona múltiples cuentas pero no es la respuesta directa a separar costos."
    ]
  },
  {
    "id": 44,
    "domain": "Costos y Facturación",
    "q": "¿Cuál es un beneficio de la facturación consolidada para cuentas de AWS?",
    "opts": [
      "A) Acceso a AWS Personal Health Dashboard",
      "B) Descuentos por volumen de uso combinado",
      "C) Seguridad de cuenta mejorada",
      "D) IAM centralizado"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "La facturación consolidada (a través de AWS Organizations) combina el uso de todas las cuentas miembro en una sola factura. El beneficio principal es que al sumar el uso de todas las cuentas, alcanzas umbrales de descuento por volumen más rápido. Si una cuenta usa 3 TB de S3 y otra 7 TB, el descuento se calcula sobre 10 TB combinados.",
      "Personal Health Dashboard es un servicio aparte. La seguridad no mejora por consolidar facturas. IAM no se centraliza automáticamente con facturación consolidada."
    ]
  },
  {
    "id": 45,
    "domain": "Costos y Facturación",
    "q": "¿Qué servicio de AWS permite establecer límites de uso y costos personalizados, y alerta cuando se exceden los umbrales?",
    "opts": [
      "A) AWS Organizations",
      "B) AWS Budgets",
      "C) Cost Explorer",
      "D) AWS Trusted Advisor"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS Budgets te permite definir presupuestos de gasto (ejemplo: \"no gastar más de 500 USD/mes en EC2\") y recibir alertas por email o SNS cuando te acercas o superas el umbral.",
      "Cost Explorer te permite visualizar y analizar costos históricos con gráficos, pero no establece límites ni envía alertas proactivas. Organizations gestiona múltiples cuentas. Trusted Advisor da recomendaciones generales."
    ]
  },
  {
    "id": 46,
    "domain": "Seguridad",
    "q": "¿Qué servicio de AWS detecta fugas inadvertidas de información personal (PII) y datos de credenciales de usuario?",
    "opts": [
      "A) Amazon GuardDuty",
      "B) Amazon Inspector",
      "C) Amazon Macie",
      "D) AWS Shield"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Amazon Macie usa machine learning para descubrir, clasificar y proteger datos sensibles almacenados en S3. Detecta automáticamente si tienes datos personales (PII) como números de tarjeta de crédito, DNI, emails, contraseñas expuestos en tus buckets de S3.",
      "GuardDuty detecta actividades maliciosas en tu cuenta (no datos sensibles). Inspector escanea vulnerabilidades de software en instancias EC2. Shield protege contra ataques DDoS."
    ]
  },
  {
    "id": 47,
    "domain": "Costos y Facturación",
    "q": "¿Qué herramienta se puede usar para monitorear los límites de servicio de AWS?",
    "opts": [
      "A) AWS Total Cost of Ownership (TCO) Calculator",
      "B) AWS Trusted Advisor",
      "C) AWS Personal Health Dashboard",
      "D) AWS Cost and Usage report"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Trusted Advisor tiene una categoría dedicada a \"Service Limits\" (límites de servicio). AWS impone límites en cada cuenta (ejemplo: máximo 20 instancias EC2 en una región, máximo 100 buckets S3). Trusted Advisor te avisa cuando te acercas a esos límites.",
      "TCO Calculator estima costos de migración. Personal Health Dashboard muestra eventos que afectan tus recursos. Cost and Usage report detalla tu gasto."
    ]
  },
  {
    "id": 48,
    "domain": "Seguridad",
    "q": "¿Cuál describe una práctica recomendada de seguridad implementable con IAM?",
    "opts": [
      "A) Deshabilitar acceso a la consola para todos los usuarios",
      "B) Generar claves secretas para cada usuario de IAM",
      "C) Otorgar permisos solo a usuarios que deben realizar una tarea determinada",
      "D) Almacenar credenciales de AWS dentro de instancias EC2"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Esto se llama el \"principio de privilegio mínimo\" (least privilege): cada usuario solo tiene acceso exactamente a lo que necesita para hacer su trabajo, nada más. Es la práctica de seguridad más importante en IAM.",
      "Deshabilitar toda la consola impediría trabajar. No todos los usuarios necesitan claves programáticas. Nunca debes guardar credenciales directamente en instancias EC2 (usa roles de IAM en su lugar)."
    ]
  },
  {
    "id": 49,
    "domain": "Gestión y Gobernanza",
    "q": "¿Qué se puede utilizar para automatizar y administrar entornos de AWS seguros, bien diseñados y con múltiples cuentas?",
    "opts": [
      "A) AWS shared responsibility model",
      "B) AWS Control Tower",
      "C) AWS Security Hub",
      "D) AWS Well-Architected Tool"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS Control Tower automatiza la creación y configuración de un entorno multi-cuenta siguiendo las mejores prácticas de AWS. Crea una \"landing zone\" con reglas predefinidas: guardrails de seguridad, logging centralizado, acceso controlado.",
      "El modelo de responsabilidad compartida es un concepto, no un servicio. Security Hub centraliza alertas de seguridad de múltiples servicios. Well-Architected Tool evalúa tu arquitectura contra mejores prácticas pero no configura cuentas."
    ]
  },
  {
    "id": 50,
    "domain": "Responsabilidad Compartida",
    "q": "Según el modelo de responsabilidad compartida, ¿cuáles son responsabilidades del CLIENTE? (Escoge dos.)",
    "opts": [
      "A) Seguridad física y ambiental",
      "B) Dispositivos de red física",
      "C) Desmantelamiento de dispositivos de almacenamiento",
      "D) Seguridad de los datos en tránsito",
      "E) Autenticación de integridad de datos"
    ],
    "correct": [
      3,
      4
    ],
    "multi": true,
    "explanation": [
      "El modelo de responsabilidad compartida divide las obligaciones: AWS es responsable de la seguridad DE la nube (hardware, redes físicas, data centers, desmantelamiento de discos, etc.) y el cliente es responsable de la seguridad EN la nube (cifrar sus datos, gestionar accesos, configurar firewalls, etc.).",
      "Seguridad de datos en tránsito (cifrar datos cuando viajan por red) y autenticación de integridad de datos son responsabilidad tuya. La seguridad física, los dispositivos de red, y el desmantelamiento de discos son responsabilidad de AWS."
    ]
  },
  {
    "id": 51,
    "domain": "Cómputo (EC2 Pricing)",
    "q": "Un profesional tiene una carga de trabajo de análisis que se ejecuta con poca frecuencia y puede interrumpirse. ¿Qué opción de EC2 optimiza el costo?",
    "opts": [
      "A) On-Demand Instances",
      "B) Reserved Instances",
      "C) Spot Instances",
      "D) Dedicated Hosts"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "\"Poca frecuencia\" descarta Reserved (compromiso continuo). \"Puede interrumpirse\" habilita Spot (la más barata, hasta 90% de descuento). No necesita Dedicated porque no hay requisitos de licencia.",
      "Este patrón se repite mucho en el examen: busca las palabras \"puede interrumpirse\" o \"tolerante a fallos\" para identificar Spot como respuesta."
    ]
  },
  {
    "id": 52,
    "domain": "Cómputo (Servicios)",
    "q": "¿Qué servicio de contenedores de AWS ayuda a instalar, operar y escalar la infraestructura de administración de clústeres?",
    "opts": [
      "A) Amazon ECR",
      "B) AWS Elastic Beanstalk",
      "C) Amazon ECS",
      "D) Amazon EBS"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Amazon ECS (Elastic Container Service) es el servicio para ejecutar y gestionar contenedores Docker en AWS. Un contenedor es un paquete que incluye tu aplicación con todas sus dependencias, garantizando que funcione igual en cualquier entorno. ECS administra el clúster de servidores donde corren esos contenedores.",
      "ECR (Elastic Container Registry) es solo el repositorio donde guardas las imágenes de tus contenedores (como un almacén). Elastic Beanstalk despliega aplicaciones automáticamente pero no es específico de contenedores. EBS (Elastic Block Store) es almacenamiento de disco para instancias EC2."
    ]
  },
  {
    "id": 53,
    "domain": "Costos y Facturación",
    "q": "¿Qué hace la calculadora mensual simple de AWS?",
    "opts": [
      "A) Compara costos locales con colocación",
      "B) Estima la facturación mensual según uso proyectado",
      "C) Estima consumo de energía en centros de datos",
      "D) Estima la utilización de CPU"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "La AWS Simple Monthly Calculator (ahora reemplazada por AWS Pricing Calculator) permite estimar cuánto costaría tu infraestructura en AWS antes de usarla. Seleccionas los servicios que planeas usar, configuras las cantidades (horas de EC2, GB de S3, etc.) y te da un estimado mensual.",
      "No compara con on-premises (eso lo hace la TCO Calculator). No mide energía ni CPU."
    ]
  },
  {
    "id": 54,
    "domain": "Responsabilidad Compartida",
    "q": "¿Quién es responsable de parchear el sistema operativo invitado para Amazon RDS?",
    "opts": [
      "A) El equipo de producto de AWS",
      "B) El administrador de base de datos del cliente",
      "C) Socios administrados",
      "D) AWS Support"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "Para Amazon RDS (Relational Database Service), AWS se encarga del parcheo del sistema operativo subyacente. Este es un punto clave del modelo de responsabilidad compartida: en servicios administrados como RDS, AWS asume más responsabilidades.",
      "Contrasta con EC2: si instalas tu propia base de datos en EC2, TÚ eres responsable de parchear el sistema operativo. En RDS, AWS lo hace por ti. Esa es justamente la ventaja de usar un servicio administrado."
    ]
  },
  {
    "id": 55,
    "domain": "Cómputo (Servicios)",
    "q": "¿Qué servicios de AWS se pueden escalar con AWS Auto Scaling? (Escoge dos.)",
    "opts": [
      "A) Amazon EC2",
      "B) Amazon DynamoDB",
      "C) Amazon S3",
      "D) Amazon Route 53",
      "E) Amazon Redshift"
    ],
    "correct": [
      0,
      1
    ],
    "multi": true,
    "explanation": [
      "AWS Auto Scaling puede escalar automáticamente EC2 (agregar/quitar instancias según demanda), DynamoDB (ajustar capacidad de lectura/escritura), ECS, Aurora y otros servicios.",
      "S3 escala automáticamente por diseño, no necesita Auto Scaling. Route 53 (DNS) tampoco necesita escalado manual. Redshift tiene su propio mecanismo de redimensionamiento pero no se integra con AWS Auto Scaling."
    ]
  },
  {
    "id": 56,
    "domain": "Redes",
    "q": "¿Cuáles son beneficios de AWS Global Accelerator? (Escoge dos.)",
    "opts": [
      "A) Costo reducido para ejecutar servicios",
      "B) Disponibilidad mejorada de las aplicaciones",
      "C) Mayor durabilidad de datos almacenados",
      "D) Reducción de la latencia hacia aplicaciones",
      "E) Mayor seguridad de datos almacenados"
    ],
    "correct": [
      1,
      3
    ],
    "multi": true,
    "explanation": [
      "AWS Global Accelerator enruta el tráfico de tus usuarios a través de la red global privada de AWS (en vez de internet público) hacia tus aplicaciones. Esto mejora dos cosas: disponibilidad (redirige automáticamente a endpoints sanos si uno falla) y latencia (la red privada de AWS es más rápida y estable que internet público).",
      "No reduce costos, no mejora durabilidad de datos (eso es S3), y no es un servicio de seguridad."
    ]
  },
  {
    "id": 57,
    "domain": "Soporte y Plataforma",
    "q": "Un usuario que necesita ayuda con facturación y reactivar una cuenta suspendida debe enviar solicitud a:",
    "opts": [
      "A) El foro de AWS Support",
      "B) El foro de AWS Support",
      "C) Un AWS Solutions Architect",
      "D) AWS Support"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Los problemas de facturación y cuentas suspendidas se resuelven a través de AWS Support. Puedes abrir un caso de soporte de tipo \"Account and billing\" directamente, incluso con el plan Basic (gratuito).",
      "Los foros comunitarios no pueden resolver problemas de tu cuenta. Los Solutions Architects ayudan con diseño de arquitectura, no con facturación."
    ]
  },
  {
    "id": 58,
    "domain": "Infraestructura Global",
    "q": "¿Qué práctica recomendada utiliza la elasticidad y agilidad de la computación en la nube?",
    "opts": [
      "A) Aprovisionar capacidad basada en uso anterior y picos teóricos",
      "B) Escalar dinámica y predictivamente para satisfacer la demanda",
      "C) Crear la aplicación en un data center con acceso físico",
      "D) Dividir la aplicación en componentes débilmente acoplados"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Escalar dinámica y predictivamente es la práctica que aprovecha la elasticidad (ajustar recursos automáticamente según demanda real) y la agilidad (implementar cambios rápidamente).",
      "La opción A es el modelo antiguo (sobreaprovisionamiento basado en estimaciones). La C es on-premises. La D es un buen principio de diseño (desacoplamiento) pero no se trata específicamente de elasticidad/agilidad."
    ]
  },
  {
    "id": 59,
    "domain": "Responsabilidad Compartida",
    "q": "Según el modelo de responsabilidad compartida, ¿cuál es responsabilidad del CLIENTE?",
    "opts": [
      "A) Parchar hipervisores Xen y KVM",
      "B) Parchar el SO para Amazon DynamoDB",
      "C) Parchar el SO para instancias de bases de datos en EC2",
      "D) Parchar el SO para instancias de bases de datos en RDS"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Si TÚ instalas una base de datos en una instancia EC2, TÚ eres responsable de parchear el sistema operativo, porque EC2 es IaaS (Infrastructure as a Service): AWS te da la máquina, tú la administras.",
      "Para RDS, AWS parchea el SO (es un servicio administrado). DynamoDB no tiene SO expuesto (es serverless). Los hipervisores (Xen, KVM) son la capa de virtualización que AWS administra."
    ]
  },
  {
    "id": 60,
    "domain": "Costos y Facturación",
    "q": "Las herramientas de administración de costos de AWS permiten: (Escoge dos.)",
    "opts": [
      "A) Cancelar recursos automáticamente si se superan presupuestos",
      "B) Desglosar costos por día, servicio y cuenta vinculada",
      "C) Crear presupuestos y recibir notificaciones si se superan",
      "D) Cambiar automáticamente a Reserved o Spot según conveniencia",
      "E) Mover datos de S3 a una clase más barata automáticamente"
    ],
    "correct": [
      1,
      2
    ],
    "multi": true,
    "explanation": [
      "Cost Explorer permite desglosar y visualizar costos por período, servicio, cuenta, etiqueta, etc. AWS Budgets permite crear presupuestos con alertas cuando te acercas o excedes el límite.",
      "AWS no cancela recursos automáticamente por presupuesto (sería peligroso). No cambia automáticamente entre tipos de instancia. La opción E describe S3 Lifecycle Policies, que existe pero no es una \"herramienta de administración de costos\"."
    ]
  },
  {
    "id": 61,
    "domain": "Redes",
    "q": "¿Qué función de Amazon VPC permite capturar información sobre el tráfico IP que llega a instancias EC2?",
    "opts": [
      "A) Security groups",
      "B) Elastic network interfaces",
      "C) Network ACLs",
      "D) VPC Flow Logs"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "VPC Flow Logs captura información sobre el tráfico de red que entra y sale de las interfaces de red en tu VPC: dirección IP de origen y destino, puertos, protocolo, si fue aceptado o rechazado, y cuántos bytes se transfirieron. Es fundamental para diagnóstico de problemas de conectividad y análisis de seguridad.",
      "Security Groups filtran tráfico pero no lo registran. Las interfaces de red (ENI) son los \"adaptadores de red\" virtuales de las instancias. Las Network ACLs filtran tráfico a nivel de subred."
    ]
  },
  {
    "id": 62,
    "domain": "Cómputo (Servicios)",
    "q": "¿Qué servicio de AWS se puede usar para escalar automáticamente una aplicación sin tomar decisiones de planificación de capacidad?",
    "opts": [
      "A) Amazon AutoScaling",
      "B) Amazon Redshift",
      "C) AWS CloudTrail",
      "D) AWS Lambda"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "AWS Auto Scaling ajusta automáticamente la cantidad de recursos (instancias EC2, capacidad de DynamoDB, etc.) según la demanda. \"Sin planificación de capacidad\" significa que no necesitas adivinar cuántos servidores necesitarás: Auto Scaling lo decide por ti basándose en métricas como uso de CPU o cantidad de solicitudes.",
      "Redshift es un data warehouse. CloudTrail registra llamadas a la API. Lambda es serverless (también escala automáticamente, pero la pregunta habla específicamente de escalar una aplicación hacia arriba y abajo)."
    ]
  },
  {
    "id": 63,
    "domain": "Soporte y Plataforma",
    "q": "Los usuarios de Enterprise Support tienen acceso a qué servicio o característica que NO está disponible en otros planes?",
    "opts": [
      "A) AWS Trusted Advisor",
      "B) AWS Support case",
      "C) Concierge team",
      "D) Amazon Connect"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "El equipo Concierge es exclusivo del plan Enterprise. Son especialistas en facturación y gestión de cuentas que te ayudan con optimización de costos, administración de cuentas y navegación de los servicios de AWS a nivel organizacional.",
      "Trusted Advisor está disponible (con limitaciones) en todos los planes. Los casos de soporte (Support cases) están disponibles desde el plan Developer en adelante. Amazon Connect es un servicio de centro de contacto, no una característica de soporte."
    ]
  },
  {
    "id": 64,
    "domain": "Bases de Datos",
    "q": "Una empresa quiere migrar una base de datos MySQL a AWS sin presupuesto para administradores de BD. ¿Qué servicio soporta este caso?",
    "opts": [
      "A) Amazon RDS",
      "B) Amazon DynamoDB",
      "C) Amazon DocumentDB",
      "D) Amazon ElastiCache"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "Amazon RDS (Relational Database Service) es la respuesta porque: 1) soporta MySQL específicamente, y 2) es administrado por AWS (instalación, parches, backups, recuperación son automáticos), eliminando la necesidad de un DBA dedicado.",
      "DynamoDB es NoSQL (no MySQL). DocumentDB es compatible con MongoDB (no MySQL). ElastiCache es caché en memoria (Redis/Memcached), no una base de datos relacional."
    ]
  },
  {
    "id": 65,
    "domain": "Infraestructura Global",
    "q": "Una empresa desea expandirse de una región de AWS a una segunda región. ¿Qué debe hacer para comenzar?",
    "opts": [
      "A) Contactar un administrador de cuentas para firmar nuevo contrato",
      "B) Mover una zona de disponibilidad a la nueva región",
      "C) Comenzar a implementar recursos en la segunda región",
      "D) Descargar la consola de administración para la nueva región"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "En AWS, todas las regiones están disponibles para tu cuenta por defecto (con algunas excepciones de regiones opt-in). No necesitas contratos adicionales ni permisos especiales: simplemente seleccionas la nueva región en la consola y empiezas a crear recursos ahí.",
      "No se \"mueven\" zonas de disponibilidad. La consola de administración es web y funciona para todas las regiones (no se descarga). No necesitas firmar nada."
    ]
  },
  {
    "id": 66,
    "domain": "Cómputo (EC2 Pricing)",
    "q": "Un usuario necesita cumplir requisitos de licencia que establecen que la carga debe alojarse en un servidor físico. ¿Qué opción de EC2 cumple esto?",
    "opts": [
      "A) Dedicated Hosts",
      "B) Dedicated Instances",
      "C) Spot Instances",
      "D) Reserved Instances"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "Dedicated Hosts te dan un servidor FÍSICO completo dedicado exclusivamente a ti. Esto es necesario cuando tus licencias de software (como Oracle, Windows Server, SQL Server) se basan en el número de sockets o cores físicos del servidor y necesitas visibilidad sobre el hardware.",
      "Dedicated Instances corren en hardware dedicado pero NO te dan control sobre el servidor físico específico (AWS puede mover tu instancia entre servidores dedicados). Spot y Reserved no garantizan hardware dedicado."
    ]
  },
  {
    "id": 67,
    "domain": "Seguridad",
    "q": "¿Qué servicios de AWS pueden generar claves de cifrado? (Escoge dos.)",
    "opts": [
      "A) Amazon Macie",
      "B) AWS Certificate Manager",
      "C) AWS KMS",
      "D) AWS Secrets Manager",
      "E) AWS CloudHSM"
    ],
    "correct": [
      2,
      4
    ],
    "multi": true,
    "explanation": [
      "AWS KMS (Key Management Service) crea y administra claves de cifrado por software. AWS CloudHSM (Hardware Security Module) hace lo mismo pero usando dispositivos de hardware dedicados certificados (FIPS 140-2 Level 3), requeridos por ciertas regulaciones de seguridad muy estrictas.",
      "Macie detecta datos sensibles en S3. Certificate Manager gestiona certificados SSL/TLS (para HTTPS), no claves de cifrado de datos. Secrets Manager almacena contraseñas y secretos, no genera claves de cifrado."
    ]
  },
  {
    "id": 68,
    "domain": "Costos y Facturación",
    "q": "¿Qué herramienta de AWS proporciona informes detallados de ahorros estimados después de migrar desde on-premises?",
    "opts": [
      "A) AWS TCO Calculator",
      "B) Cost Explorer",
      "C) AWS Budgets",
      "D) AWS Migration Hub"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "La AWS TCO Calculator (Total Cost of Ownership, Costo Total de Propiedad) compara cuánto te cuesta mantener tu infraestructura actual on-premises (servidores, electricidad, personal, espacio físico, refrigeración, etc.) contra cuánto costaría lo mismo en AWS, mostrando el ahorro estimado.",
      "Cost Explorer analiza costos que YA tienes en AWS. Budgets establece presupuestos. Migration Hub centraliza el seguimiento de migraciones pero no calcula ahorros."
    ]
  },
  {
    "id": 69,
    "domain": "Soporte y Plataforma",
    "q": "¿Qué puede ayudar en la evaluación de una aplicación para migración a la nube? (Escoge dos.)",
    "opts": [
      "A) AWS Trusted Advisor",
      "B) AWS Professional Services",
      "C) AWS Systems Manager",
      "D) AWS Partner Network (APN)",
      "E) AWS Secrets Manager"
    ],
    "correct": [
      1,
      3
    ],
    "multi": true,
    "explanation": [
      "AWS Professional Services es un equipo de consultores de AWS que te ayudan con la estrategia y ejecución de la migración. AWS Partner Network (APN) es la red de empresas certificadas por AWS (consultoras, integradores) que también ofrecen servicios de evaluación y migración.",
      "Trusted Advisor da recomendaciones sobre tu cuenta actual, no evalúa aplicaciones para migración. Systems Manager gestiona instancias. Secrets Manager almacena contraseñas."
    ]
  },
  {
    "id": 70,
    "domain": "Seguridad",
    "q": "¿Qué servicio de AWS cumple requisitos de compliance de seguridad usando dispositivos de hardware dedicados dentro de la nube?",
    "opts": [
      "A) AWS Secrets Manager",
      "B) AWS CloudHSM",
      "C) AWS KMS",
      "D) AWS Directory Service"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS CloudHSM (Hardware Security Module, Módulo de Seguridad por Hardware) proporciona dispositivos físicos dedicados exclusivamente a tu cuenta para almacenar y gestionar claves de cifrado. Están certificados FIPS 140-2 Level 3, un estándar de seguridad requerido por regulaciones financieras y gubernamentales.",
      "KMS también cifra pero usa hardware compartido (multi-tenant). Secrets Manager almacena secretos, no usa hardware dedicado. Directory Service gestiona directorios de Active Directory."
    ]
  },
  {
    "id": 71,
    "domain": "Responsabilidad Compartida",
    "q": "Bajo el modelo de responsabilidad compartida, ¿qué administra el CLIENTE? (Escoge dos.)",
    "opts": [
      "A) Desmantelamiento de dispositivos de almacenamiento físico",
      "B) Configuración de Security Groups y ACL de red",
      "C) Parches del SO de una instancia Amazon RDS",
      "D) Control de acceso físico a centros de datos",
      "E) Parches del SO de una instancia Amazon EC2"
    ],
    "correct": [
      1,
      4
    ],
    "multi": true,
    "explanation": [
      "El cliente configura los Security Groups (firewalls virtuales a nivel de instancia) y las ACL de red (firewalls a nivel de subred). También es responsable de parchear el sistema operativo de sus instancias EC2.",
      "AWS se encarga de: destruir discos viejos de forma segura (A), controlar acceso físico a data centers (D), y parchear el SO de servicios administrados como RDS (C). Recuerda: en RDS, AWS parchea el SO; en EC2, tú lo haces."
    ]
  },
  {
    "id": 72,
    "domain": "Cómputo (Servicios)",
    "q": "¿Qué servicio de AWS es adecuado para una carga de trabajo basada en eventos?",
    "opts": [
      "A) Amazon EC2",
      "B) AWS Elastic Beanstalk",
      "C) AWS Lambda",
      "D) Amazon Lumberyard"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "AWS Lambda es perfecto para cargas basadas en eventos: se ejecuta automáticamente cuando ocurre un evento (alguien sube un archivo a S3, llega un mensaje a una cola, se activa un endpoint de API, un temporizador se dispara). No necesitas servidores corriendo esperando.",
      "EC2 requiere instancias activas permanentemente. Elastic Beanstalk despliega aplicaciones web pero usa servidores detrás de escena. Lumberyard era un motor de videojuegos ya discontinuado."
    ]
  },
  {
    "id": 73,
    "domain": "Infraestructura Global",
    "q": "¿Cuál es una propuesta de valor de la nube de AWS?",
    "opts": [
      "A) AWS es responsable de la seguridad en la nube",
      "B) No se requiere contrato a largo plazo",
      "C) Aprovisionar nuevos servidores en días",
      "D) AWS administra las aplicaciones de los usuarios"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Una ventaja clave de AWS es que no requiere contratos a largo plazo: puedes empezar y parar cuando quieras, pagar solo por lo que usas, sin compromisos mínimos.",
      "La A es parcialmente cierta (AWS es responsable de la seguridad DE la nube) pero está formulada de forma engañosa. La C es incorrecta porque en AWS aprovisionas servidores en MINUTOS, no días. La D es falsa: AWS administra la infraestructura, no tus aplicaciones."
    ]
  },
  {
    "id": 74,
    "domain": "Almacenamiento",
    "q": "¿Cuál es una característica de la replicación entre regiones de Amazon S3?",
    "opts": [
      "A) Los buckets de origen y destino deben tener el versionado deshabilitado",
      "B) Los buckets de origen y destino no pueden estar en diferentes regiones",
      "C) Los buckets pueden ser propiedad de una sola cuenta o de cuentas diferentes",
      "D) El propietario debe tener las regiones de origen y destino deshabilitadas"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "La replicación entre regiones de S3 (Cross-Region Replication) copia objetos automáticamente de un bucket en una región a otro bucket en otra región. Los buckets pueden pertenecer a la misma cuenta de AWS o a cuentas diferentes. Esto es útil para disaster recovery, cumplimiento regulatorio, o reducir latencia para usuarios en diferentes regiones.",
      "El versionado debe estar HABILITADO (no deshabilitado) en ambos buckets. Por definición, están en diferentes regiones. Las regiones deben estar activas, no deshabilitadas."
    ]
  },
  {
    "id": 75,
    "domain": "Responsabilidad Compartida",
    "q": "¿De qué es responsable un usuario cuando ejecuta una aplicación en la nube de AWS?",
    "opts": [
      "A) Administrar hardware físico",
      "B) Actualizar el hipervisor subyacente",
      "C) Proporcionar lista de usuarios aprobados para acceso al data center",
      "D) Gestionar actualizaciones de software de la aplicación"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "TÚ eres responsable de mantener actualizado el software de tu propia aplicación (parches, versiones, dependencias). AWS se encarga del hardware físico, los hipervisores (la capa de virtualización que permite crear máquinas virtuales), y la seguridad física de los data centers.",
      "Esta pregunta refuerza la línea divisoria del modelo de responsabilidad compartida: AWS gestiona todo \"debajo\" de la máquina virtual; tú gestionas todo \"encima\" (SO en EC2, tu código, tus datos)."
    ]
  },
  {
    "id": 76,
    "domain": "Infraestructura Global",
    "q": "Una empresa necesita ofrecer rápidamente nuevas funciones de forma iterativa. ¿Qué característica de la nube proporciona esto?",
    "opts": [
      "A) Elasticidad",
      "B) Alta disponibilidad",
      "C) Agilidad",
      "D) Fiabilidad"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "La agilidad en cloud es la capacidad de experimentar, iterar y lanzar nuevas funcionalidades rápidamente. Puedes crear entornos de prueba en minutos, probar una idea, y descartarla si no funciona, sin invertir meses en adquirir hardware.",
      "Elasticidad = escalar recursos según demanda. Alta disponibilidad = que el sistema no se caiga. Fiabilidad = que funcione correctamente bajo cualquier condición. Todas son ventajas de la nube pero la que habilita velocidad de iteración es agilidad."
    ]
  },
  {
    "id": 77,
    "domain": "Costos y Facturación",
    "q": "¿Qué características o servicios se pueden usar para monitorear costos y gastos de una cuenta? (Escoge dos.)",
    "opts": [
      "A) AWS Cost and Usage report",
      "B) AWS product pages",
      "C) AWS Simple Monthly Calculator",
      "D) Billing alerts y Amazon CloudWatch alarms",
      "E) AWS Price List API"
    ],
    "correct": [
      0,
      3
    ],
    "multi": true,
    "explanation": [
      "AWS Cost and Usage Report es el reporte más detallado de tu gasto: desglosa cada centavo por servicio, recurso, etiqueta, hora, etc. Las alertas de facturación con alarmas de CloudWatch te notifican cuando tu gasto supera un umbral que definas.",
      "Las páginas de productos muestran precios de referencia, no tu gasto real. La calculadora mensual estima costos futuros, no monitorea gasto actual. La Price List API da precios programáticamente pero no monitorea TU gasto."
    ]
  },
  {
    "id": 78,
    "domain": "Redes",
    "q": "Amazon Route 53 permite a los usuarios:",
    "opts": [
      "A) Cifrar datos en tránsito",
      "B) Registrar nombres de dominio DNS",
      "C) Generar y administrar certificados SSL",
      "D) Establecer una conexión de red dedicada a AWS"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Amazon Route 53 es el servicio de DNS (Domain Name System) de AWS. Permite registrar nombres de dominio (comprar \"miempresa.com\"), y configurar cómo se traducen esos nombres a direcciones IP de tus servidores. También ofrece health checks y enrutamiento inteligente (geolocalización, failover, etc.).",
      "Cifrar datos en tránsito se hace con TLS/SSL. Certificados SSL los gestiona AWS Certificate Manager. Conexión dedicada es AWS Direct Connect."
    ]
  },
  {
    "id": 79,
    "domain": "Seguridad",
    "q": "¿Qué servicio de AWS ayuda a identificar actividades maliciosas o no autorizadas en cuentas y cargas de trabajo?",
    "opts": [
      "A) Amazon Rekognition",
      "B) AWS Trusted Advisor",
      "C) Amazon GuardDuty",
      "D) Amazon CloudWatch"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Amazon GuardDuty analiza continuamente los logs de tu cuenta (llamadas a la API via CloudTrail, tráfico de red via VPC Flow Logs, consultas DNS) usando machine learning e inteligencia de amenazas para detectar actividades sospechosas: accesos desde IPs maliciosas, instancias comunicándose con servidores de malware, patrones de criptominería, etc.",
      "Rekognition es reconocimiento de imágenes y video (detección de rostros, objetos). Trusted Advisor da recomendaciones de mejores prácticas. CloudWatch monitorea métricas operacionales."
    ]
  },
  {
    "id": 80,
    "domain": "Soporte y Plataforma",
    "q": "Una empresa quiere probar una solución de comercio electrónico de terceros antes de usarla a largo plazo. ¿Qué servicio apoyará esto?",
    "opts": [
      "A) AWS Marketplace",
      "B) AWS Partner Network (APN)",
      "C) AWS Managed Services",
      "D) AWS Service Catalog"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "AWS Marketplace permite encontrar, probar y comprar software de terceros. Muchos productos ofrecen pruebas gratuitas o versiones de evaluación que puedes desplegar directamente en tu cuenta de AWS para probar antes de comprometerte.",
      "APN es la red de socios consultores. Managed Services es un servicio donde AWS opera tu infraestructura por ti. Service Catalog permite a organizaciones crear catálogos internos de recursos aprobados para sus equipos."
    ]
  },
  {
    "id": 81,
    "domain": "Gestión y Gobernanza",
    "q": "¿Qué es AWS Trusted Advisor?",
    "opts": [
      "A) Un miembro del personal de AWS que recomienda mejores prácticas",
      "B) Una red de socios que recomienda mejores prácticas sobre AWS",
      "C) Una herramienta con comprobaciones automatizadas que da recomendaciones sobre costo, rendimiento, seguridad y límites de servicio",
      "D) Otro nombre para los Technical Account Managers de AWS"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "AWS Trusted Advisor es una herramienta automatizada. Revisa tu cuenta y te muestra recomendaciones de mejores prácticas en áreas como optimización de costos, seguridad, tolerancia a fallos, rendimiento, cuotas de servicio y excelencia operacional.",
      "NO es una persona ni un equipo de consultores. Un TAM existe solo en ciertos planes de soporte y tiene otro rol. Aquí la clave conceptual es distinguir una herramienta de análisis automatizado frente a soporte humano o partners."
    ]
  },
  {
    "id": 82,
    "domain": "Costos y Facturación",
    "q": "¿Qué servicio o función de AWS permite a una empresa visualizar, comprender y gestionar los costes y el uso de AWS a lo largo del tiempo?",
    "opts": [
      "A) AWS Budgets",
      "B) AWS Cost Explorer",
      "C) AWS Organizations",
      "D) Consolidated Billing"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS Cost Explorer está pensado para explorar gasto y uso históricamente: ver tendencias, filtrar por servicio, cuenta, etiquetas o región, y detectar qué está impulsando el costo. Sirve para entender, no solo para alertar.",
      "AWS Budgets se enfoca en presupuestos y notificaciones. AWS Organizations y la facturación consolidada ayudan a agrupar cuentas, pero no son la herramienta principal para analizar el consumo con detalle a lo largo del tiempo."
    ]
  },
  {
    "id": 83,
    "domain": "Cómputo (Servicios)",
    "q": "¿Qué servicio de AWS gestiona los detalles de implementación del aprovisionamiento de capacidad, el balanceo de carga, el escalado automático y la monitorización del estado de las aplicaciones?",
    "opts": [
      "A) AWS Config",
      "B) AWS Elastic Beanstalk",
      "C) Amazon Route 53",
      "D) Amazon CloudFront"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS Elastic Beanstalk es una plataforma administrada para desplegar aplicaciones. Tú subes el código y el servicio orquesta por detrás recursos como EC2, balanceadores, Auto Scaling y chequeos de salud para ejecutar la app.",
      "Config registra configuraciones y cambios. Route 53 resuelve DNS. CloudFront distribuye contenido mediante caché global. La pista aquí es que la pregunta habla de gestionar el DESPLIEGUE operativo de la aplicación completa, no de una sola pieza."
    ]
  },
  {
    "id": 84,
    "domain": "Redes",
    "q": "¿Qué servicio de AWS proporciona listas de control de acceso (ACL) de red de entrada y salida para reforzar la conectividad externa a Amazon EC2?",
    "opts": [
      "A) AWS IAM",
      "B) Amazon Connect",
      "C) Amazon VPC",
      "D) Amazon API Gateway"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Las Network ACLs forman parte de Amazon VPC. Operan a nivel de subred y permiten definir reglas stateless de entrada y salida para controlar el tráfico de red que puede llegar a los recursos dentro de esa VPC.",
      "IAM controla identidades y permisos, no tráfico IP. Amazon Connect es un servicio de contact center. API Gateway publica APIs. Aquí debes separar seguridad de red de seguridad de identidad: son capas DISTINTAS."
    ]
  },
  {
    "id": 85,
    "domain": "Soporte y Plataforma",
    "q": "¿Cómo puede un usuario de AWS con un plan de soporte básico de AWS obtener asistencia técnica de AWS?",
    "opts": [
      "A) AWS Senior Support Engineers",
      "B) AWS Technical Account Managers",
      "C) AWS Trusted Advisor",
      "D) AWS Discussion Forums"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Con el plan Basic, el acceso a soporte técnico personalizado es muy limitado. El canal típico para ayuda técnica es la documentación, recursos de autoservicio y los AWS Discussion Forums.",
      "Los ingenieros sénior y los TAM están ligados a planes de soporte superiores. Trusted Advisor es una herramienta de recomendaciones, no un canal de asistencia técnica interactiva."
    ]
  },
  {
    "id": 86,
    "domain": "Soporte y Plataforma",
    "q": "¿Cuáles de los siguientes son pilares del marco de arquitectura bien diseñada de AWS? (Elija dos).",
    "opts": [
      "A) Zonas de disponibilidad múltiple",
      "B) Eficiencia en el desempeño",
      "C) Seguridad",
      "D) Uso de cifrado"
    ],
    "correct": [
      1,
      2
    ],
    "multi": true,
    "explanation": [
      "Los pilares oficiales del AWS Well-Architected Framework incluyen Excelencia Operacional, Seguridad, Fiabilidad, Eficiencia del Rendimiento, Optimización de Costos y Sostenibilidad. Por eso aquí las respuestas correctas son Eficiencia en el desempeño y Seguridad.",
      "Múltiples Availability Zones y uso de cifrado son PRÁCTICAS o decisiones técnicas que pueden apoyar varios pilares, pero no son pilares en sí mismos. Confundir principios con implementaciones concretas es un error clásico."
    ]
  },
  {
    "id": 87,
    "domain": "Infraestructura Global",
    "q": "¿Qué ventaja tiene desplegar una aplicación en varias zonas de disponibilidad?",
    "opts": [
      "A) Existe un menor riesgo de falla del servicio si un desastre natural causa una interrupción del servicio en una región de AWS dada.",
      "B) La aplicación tendrá mayor disponibilidad porque puede soportar una interrupción del servicio en una zona de disponibilidad.",
      "C) Habrá una mejor cobertura ya que las zonas de disponibilidad están geográficamente distantes y pueden servir un área más amplia.",
      "D) Habrá una disminución de la latencia de la aplicación que mejorará la experiencia del usuario."
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "Desplegar en múltiples Availability Zones aumenta la alta disponibilidad dentro de una misma región. Si una AZ falla, la aplicación puede seguir operando desde otra AZ con impacto mucho menor.",
      "NO protege frente a una caída completa de la región; para eso necesitas estrategia multi-región. Tampoco existe para reducir latencia global. AZ y región resuelven problemas distintos: una mejora resiliencia local, la otra resiliencia geográfica."
    ]
  },
  {
    "id": 88,
    "domain": "Seguridad",
    "q": "Una aplicación web alojada en AWS ha recibido un ataque de spam con solicitudes maliciosas provenientes de un conjunto recurrente de direcciones IP. ¿Qué servicio de AWS puede ayudar a proteger la aplicación y bloquear el tráfico malicioso?",
    "opts": [
      "A) AWS IAM",
      "B) Amazon GuardDuty",
      "C) Amazon Simple Notification Service (Amazon SNS)",
      "D) AWS WAF"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "AWS WAF permite filtrar y bloquear solicitudes HTTP/S según reglas. Puedes bloquear IPs, rangos, patrones de ataque comunes o tasas de petición anómalas delante de servicios como CloudFront, ALB o API Gateway.",
      "IAM controla quién puede usar recursos de AWS. GuardDuty detecta amenazas y genera hallazgos, pero no es el componente principal para bloquear tráfico web en línea. SNS envía mensajes. Aquí el verbo clave es BLOQUEAR."
    ]
  },
  {
    "id": 89,
    "domain": "Redes",
    "q": "Una empresa necesita una conexión de red dedicada entre sus servidores locales y la nube de AWS. ¿Qué servicio de AWS debería utilizar?",
    "opts": [
      "A) AWS VPN",
      "B) AWS Direct Connect",
      "C) Amazon API Gateway",
      "D) Amazon Connect"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS Direct Connect proporciona una conexión de red privada y dedicada entre tu entorno on-premises y AWS. Se usa cuando necesitas más consistencia, menor variabilidad y, en muchos casos, mejor rendimiento que una conexión por Internet pública.",
      "AWS VPN también conecta entornos locales con AWS, pero viaja sobre Internet cifrada. API Gateway publica APIs y Amazon Connect es contact center. Si la pregunta dice DEDICADA, la respuesta correcta casi siempre es Direct Connect."
    ]
  },
  {
    "id": 90,
    "domain": "Almacenamiento",
    "q": "¿Qué servicio de AWS se puede utilizar para consultar conjuntos de datos almacenados directamente desde Amazon S3 mediante SQL estándar?",
    "opts": [
      "A) AWS Glue",
      "B) AWS Data Pipeline",
      "C) Amazon CloudSearch",
      "D) Amazon Athena"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Amazon Athena permite consultar datos directamente en Amazon S3 usando SQL estándar, sin tener que aprovisionar servidores. Es un servicio serverless de análisis orientado justo a ese caso de uso.",
      "Glue ayuda con catálogo y ETL. Data Pipeline orquesta flujos de datos. CloudSearch es búsqueda. Athena destaca cuando la pregunta combina tres pistas: S3, SQL y sin administrar infraestructura."
    ]
  },
  {
    "id": 91,
    "domain": "Seguridad",
    "q": "Un usuario necesita un informe automatizado de evaluación de seguridad que identifique accesos no autorizados a la red en instancias de Amazon EC2 y vulnerabilidades en dichas instancias. ¿Qué servicio de AWS proporciona este informe?",
    "opts": [
      "A) EC2 security groups",
      "B) AWS Config",
      "C) Amazon Macie",
      "D) Amazon Inspector"
    ],
    "correct": [
      3
    ],
    "multi": false,
    "explanation": [
      "Amazon Inspector evalúa cargas de trabajo para encontrar vulnerabilidades y exposición no deseada. En el contexto clásico de Cloud Practitioner, se asocia con evaluaciones automáticas de seguridad sobre instancias EC2 y su superficie de riesgo.",
      "Los security groups aplican reglas, pero no generan un informe de evaluación. Config registra configuraciones. Macie clasifica datos sensibles en S3. El patrón correcto aquí es 'evaluación automatizada de seguridad de instancias' = Inspector."
    ]
  },
  {
    "id": 92,
    "domain": "Costos y Facturación",
    "q": "¿Cómo puede una empresa aislar los costos de las cargas de trabajo de producción y las que no lo son en AWS?",
    "opts": [
      "A) Cree roles de gestión de identidad y acceso (IAM) para cargas de trabajo de producción y no producción.",
      "B) Use diferentes cuentas para los gastos de producción y no producción.",
      "C) Use Amazon EC2 para cargas de trabajo sin producción y otros servicios para cargas de trabajo de producción.",
      "D) Use Amazon CloudWatch para monitorear el uso de servicios."
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "La forma más limpia de aislar costos entre producción y no producción es usar cuentas separadas. Eso mejora segmentación financiera, límites, seguridad y gobernanza, y después puedes seguir consolidando la facturación a nivel organizacional.",
      "IAM no separa facturación por sí mismo. Elegir EC2 para un entorno y otros servicios para otro no tiene sentido como estrategia de costos. CloudWatch monitorea métricas, pero no resuelve el aislamiento organizacional del gasto."
    ]
  },
  {
    "id": 93,
    "domain": "Seguridad",
    "q": "¿Qué servicio de AWS se utiliza para proporcionar cifrado para Amazon EBS?",
    "opts": [
      "A) AWS Certificate Manager",
      "B) AWS Systems Manager",
      "C) AWS KMS",
      "D) AWS Config"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "Amazon EBS se cifra integrándose con AWS Key Management Service (AWS KMS). KMS administra las claves criptográficas que protegen volúmenes, snapshots y otros datos cifrados en distintos servicios de AWS.",
      "Certificate Manager administra certificados TLS/SSL, no cifrado de volúmenes. Systems Manager sirve para operación y administración. Config audita configuraciones. La pista importante es 'cifrado' + 'claves administradas' = KMS."
    ]
  },
  {
    "id": 94,
    "domain": "Cómputo (Servicios)",
    "q": "¿Cómo cobra AWS por el uso de AWS Lambda una vez que se ha superado el nivel gratuito? (Elija dos opciones).",
    "opts": [
      "A) Por el tiempo de ejecución de la función",
      "B) Por el número de versiones de una función Lambda específica",
      "C) Por el número de solicitudes hechas a la función",
      "D) Por el lenguaje de programación usado por la función"
    ],
    "correct": [
      0,
      2
    ],
    "multi": true,
    "explanation": [
      "AWS Lambda cobra principalmente por dos dimensiones: cantidad de solicitudes y duración de ejecución. Esa es la esencia del modelo serverless: pagas cuando el código corre, no por tener servidores encendidos esperando tráfico.",
      "No pagas por el lenguaje de programación ni por cuántas versiones hayas creado como concepto de facturación principal del servicio. El patrón a memorizar es muy simple: invocaciones + tiempo de cómputo."
    ]
  },
  {
    "id": 95,
    "domain": "Seguridad",
    "q": "¿Qué ofrece AWS Shield Standard?",
    "opts": [
      "A) Reglas de WAF",
      "B) Protección DDoS",
      "C) Permisos de gestión de identidad y acceso (IAM) y acceso a recursos",
      "D) Cifrado de datos"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "AWS Shield Standard ofrece protección administrada contra ataques DDoS de red y transporte para servicios de AWS soportados. Viene incluido sin costo adicional para muchos servicios y protege frente a ataques comunes de capa 3 y 4.",
      "No define reglas de WAF, no administra permisos IAM y no cifra datos. Si la pregunta habla de defensa básica DDoS integrada en AWS, piensa en Shield Standard; si pide soporte experto y más capacidades durante ataques, ya entras en Shield Advanced."
    ]
  },
  {
    "id": 96,
    "domain": "Costos y Facturación",
    "q": "Al comparar el costo total de propiedad (CTP) de una infraestructura local con una arquitectura en la nube, ¿qué costos se deben considerar? (Seleccione dos).",
    "opts": [
      "A) Las tarifas de procesamiento de la tarjeta de crédito para las transacciones de solicitud en la nube.",
      "B) El costo de comprar e instalar hardware del servidor en los datos locales.",
      "C) El costo de administrar la infraestructura, incluidas las instalaciones de sistema operativo e instalaciones de software, parches, copias de seguridad y recuperación de fallas.",
      "D) Los costos de las pruebas de penetración de terceros."
    ],
    "correct": [
      1,
      2
    ],
    "multi": true,
    "explanation": [
      "Cuando comparas TCO, debes contar tanto el gasto de capital como el operativo. Por eso aquí importan el hardware local y también el esfuerzo continuo de operar la plataforma: instalar, parchear, respaldar y recuperar sistemas.",
      "Las otras opciones pueden existir en ciertos contextos, pero no representan los componentes nucleares que normalmente se comparan en un análisis de TCO entre on-premises y cloud. El error típico es mirar solo compra de servidores y olvidar la operación."
    ]
  },
  {
    "id": 97,
    "domain": "Gestión y Gobernanza",
    "q": "¿Qué servicio de AWS ofrece una forma rápida y automatizada de crear y administrar cuentas de AWS?",
    "opts": [
      "A) AWS QuickSight",
      "B) Amazon Lightsail",
      "C) AWS Organizations",
      "D) Amazon Connect"
    ],
    "correct": [
      2
    ],
    "multi": false,
    "explanation": [
      "AWS Organizations permite crear y administrar múltiples cuentas de AWS de forma centralizada. Sirve para estructurar entornos por equipos o cargas, aplicar gobernanza y consolidar facturación dentro de una misma organización.",
      "QuickSight es analítica y dashboards. Lightsail simplifica despliegues de infraestructura. Connect es contact center. La pista decisiva es 'múltiples cuentas' + 'administración centralizada'."
    ]
  },
  {
    "id": 98,
    "domain": "Bases de Datos",
    "q": "¿Qué función de Amazon RDS se puede utilizar para lograr una alta disponibilidad?",
    "opts": [
      "A) Zonas de disponibilidad múltiple",
      "B) Instancias reservadas de Amazon",
      "C) Almacenamiento de IOPS aprovisionado",
      "D) Monitoreo mejorado"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "La característica Multi-AZ de Amazon RDS mantiene una réplica síncrona en otra Availability Zone para mejorar la disponibilidad y permitir failover automático ante problemas en la instancia principal o en su infraestructura subyacente.",
      "Instancias reservadas son un modelo de precio. IOPS aprovisionadas mejoran rendimiento de almacenamiento. Enhanced Monitoring da más visibilidad operativa. Alta disponibilidad en RDS se resuelve con Multi-AZ, no con observabilidad ni descuentos."
    ]
  },
  {
    "id": 99,
    "domain": "Gestión y Gobernanza",
    "q": "¿Qué servicio de AWS debe habilitarse para realizar un seguimiento de todos los cambios en las cuentas de usuario dentro de la consola de administración de AWS?",
    "opts": [
      "A) AWS CloudTrail",
      "B) Amazon Simple Notification Service (Amazon SNS)",
      "C) VPC Flow Logs",
      "D) AWS CloudHSM"
    ],
    "correct": [
      0
    ],
    "multi": false,
    "explanation": [
      "AWS CloudTrail registra actividad de la cuenta y llamadas a la API, incluidas las acciones realizadas desde la consola de administración. Es el servicio base para auditoría, trazabilidad e investigación de cambios administrativos.",
      "SNS distribuye mensajes, VPC Flow Logs captura metadatos de tráfico de red y CloudHSM administra hardware criptográfico dedicado. Si quieres saber QUIÉN hizo QUÉ y CUÁNDO en la cuenta, necesitas CloudTrail."
    ]
  },
  {
    "id": 100,
    "domain": "Cómputo (Servicios)",
    "q": "Un arquitecto de soluciones está diseñando un nuevo servicio detrás de Amazon API Gateway. Los patrones de solicitud para el servicio serán impredecibles y pueden cambiar repentinamente de 0 solicitudes a más de 500 por segundo. El tamaño total de los datos que deben persistir en un backend actualmente es menor de 1 GB y su crecimiento futuro es impredecible. Los datos se pueden consultar mediante solicitudes simples de valor-clave. ¿Qué combinación de servicios de AWS cumpliría estos requisitos? (Escoge dos.)",
    "opts": [
      "A) AWS Fargate",
      "B) AWS Lambda",
      "C) Amazon DynamoDB",
      "D) Amazon EC2 Auto Scaling"
    ],
    "correct": [
      1,
      2
    ],
    "multi": true,
    "explanation": [
      "AWS Lambda encaja con tráfico impredecible porque escala automáticamente por invocación y no obliga a planificar capacidad por adelantado. Amazon DynamoDB encaja porque el patrón de acceso es simple clave-valor y el volumen actual es pequeño pero con crecimiento incierto.",
      "Fargate y EC2 Auto Scaling pueden resolver muchos backends, pero añaden más gestión de capacidad que una arquitectura serverless simple para este caso. La pregunta está diseñada para que detectes el patrón 'API + ráfagas impredecibles + key-value' = Lambda + DynamoDB."
    ]
  },
  {
    "id": 101,
    "domain": "Almacenamiento",
    "q": "Un arquitecto de soluciones de una empresa de comercio electrónico quiere hacer una copia de seguridad de los datos de registro de aplicaciones en Amazon S3. El arquitecto de soluciones no está seguro de con qué frecuencia se accederá a los registros ni a qué registros se accederá con mayor frecuencia. La empresa quiere mantener los costos lo más bajos posible utilizando la clase de almacenamiento S3 adecuada. ¿Qué clase de almacenamiento S3 se debe implementar para cumplir con estos requisitos?",
    "opts": [
      "A) S3 Glacier",
      "B) S3 Intelligent-Tiering",
      "C) S3 Standard-Infrequent Access (S3 Standard-IA)",
      "D) S3 One Zone-Infrequent Access (S3 One Zone-IA)"
    ],
    "correct": [
      1
    ],
    "multi": false,
    "explanation": [
      "S3 Intelligent-Tiering está pensado justo para datos con patrones de acceso impredecibles. Mueve automáticamente objetos entre niveles de acceso para optimizar costo sin que tengas que adivinar qué se consultará más o menos.",
      "Glacier es archivo frío con recuperación lenta. Standard-IA y One Zone-IA son útiles cuando ya sabes que el acceso será poco frecuente. Aquí el problema central es la INCERTIDUMBRE del patrón de acceso, y por eso Intelligent-Tiering es la opción correcta."
    ]
  }
];

const domains = [];
const seen = {};
questions.forEach(function(q) { if (!seen[q.domain]) { seen[q.domain] = true; domains.push(q.domain); }});

const colors = {
  "Infraestructura Global":"#4fc3f7","Cómputo (EC2 Pricing)":"#aed581","Cómputo (Servicios)":"#81c784",
  "Almacenamiento":"#ce93d8","Bases de Datos":"#ef9a9a","Redes":"#80cbc4","Seguridad":"#ffcc80",
  "Gestión y Gobernanza":"#9fa8da","Soporte y Plataforma":"#ffe082","Costos y Facturación":"#f48fb1",
  "Responsabilidad Compartida":"#ffab91"
};
function gc(d) { return colors[d] || "#8b949e"; }
function gg(d) { var c = gc(d); return c.replace(")", ",0.1)").replace("rgb","rgba").replace("#",""); }

function Exp({ pars, accent }) {
  return (
    <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:10, padding:"16px 18px", marginBottom:22, borderLeft:"3px solid "+accent }}>
      <div style={{ fontSize:10, letterSpacing:3, color:accent, textTransform:"uppercase", marginBottom:10, fontFamily:"monospace" }}>Explicaci\u00f3n</div>
      {pars.map(function(p,i) { return <p key={i} style={{ fontSize:14, lineHeight:1.85, color:"#c9d1d9", margin: i===0?"0 0 10px 0":"10px 0" }}>{p}</p>; })}
    </div>
  );
}

export default function App() {
  var [selDom, setSelDom] = useState("all");
  var [idx, setIdx] = useState(0);
  var [sel, setSel] = useState([]);
  var [done, setDone] = useState(false);
  var [sc, setSc] = useState({c:0,t:0});
  var [mode, setMode] = useState("menu");
  var [rev, setRev] = useState(false);
  var [ans, setAns] = useState({});
  var [nav, setNav] = useState(false);

  var filt = useMemo(function() {
    if (selDom === "all") return questions.slice();
    return questions.filter(function(q) { return q.domain === selDom; });
  }, [selDom]);

  var cur = filt[idx];
  var accent = cur ? gc(cur.domain) : "#8b949e";
  var glow = cur ? "rgba(" + (accent === "#4fc3f7" ? "79,195,247" : accent === "#aed581" ? "174,213,129" : accent === "#81c784" ? "129,199,132" : accent === "#ce93d8" ? "206,147,216" : accent === "#ef9a9a" ? "239,154,154" : accent === "#80cbc4" ? "128,203,196" : accent === "#ffcc80" ? "255,204,128" : accent === "#9fa8da" ? "159,168,218" : accent === "#ffe082" ? "255,224,130" : accent === "#f48fb1" ? "244,143,177" : accent === "#ffab91" ? "255,171,145" : "139,148,158") + ",0.1)" : "rgba(139,148,158,0.1)";
  var font = "-apple-system,BlinkMacSystemFont,\'Segoe UI\',system-ui,sans-serif";

  function goTo(i) { setIdx(i); var k=filt[i].id; if(ans[k]){setSel(ans[k].s);setDone(true);}else{setSel([]);setDone(false);} setNav(false); }
  function tog(i) { if(done)return; if(cur.multi){setSel(function(p){return p.includes(i)?p.filter(function(x){return x!==i;}):p.concat([i]);});}else{setSel([i]);} }
  function sub() { if(sel.length===0)return; setDone(true); var ok=sel.length===cur.correct.length&&sel.every(function(s){return cur.correct.includes(s);})&&cur.correct.every(function(c){return sel.includes(c);}); var na=Object.assign({},ans); na[cur.id]={s:sel,ok:ok}; setAns(na); if(ok)setSc({c:sc.c+1,t:sc.t+1}); else setSc({c:sc.c,t:sc.t+1}); }
  function nxt() { if(idx<filt.length-1)goTo(idx+1); else setMode("results"); }
  function prv() { if(idx>0)goTo(idx-1); }
  function startQ(d) { setSelDom(d);setIdx(0);setSel([]);setDone(false);setSc({c:0,t:0});setAns({});setRev(false);setNav(false);setMode("quiz"); }
  function startR(d) { setSelDom(d);setIdx(0);setSel([]);setDone(false);setAns({});setRev(true);setNav(false);setMode("quiz"); }

  var show = done || rev;

  function oSt(i) {
    var isC=cur.correct.includes(i), isS=sel.includes(i);
    var b = {padding:"11px 14px",borderRadius:8,cursor:show?"default":"pointer",border:"1px solid #21262d",fontSize:14,lineHeight:1.6,textAlign:"left",width:"100%",display:"block",background:"none",color:"#c9d1d9",fontFamily:"inherit"};
    if(show) {
      if(isC) return Object.assign({},b,{background:"rgba(63,185,80,0.1)",borderColor:"rgba(63,185,80,0.4)",color:"#3fb950"});
      if(isS&&!isC) return Object.assign({},b,{background:"rgba(248,81,73,0.08)",borderColor:"rgba(248,81,73,0.3)",color:"#f85149",textDecoration:"line-through"});
      return Object.assign({},b,{borderColor:"#161b22",color:"#484f58"});
    }
    if(isS) return Object.assign({},b,{background:glow,borderColor:accent,color:"#e6edf3"});
    return b;
  }

  // MENU
  if (mode==="menu") {
    return (
      <div style={{minHeight:"100vh",background:"#0d1117",color:"#c9d1d9",fontFamily:font,padding:"20px 16px"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:36,paddingTop:16}}>
            <div style={{fontSize:10,letterSpacing:5,color:"#484f58",textTransform:"uppercase",marginBottom:10,fontFamily:"monospace"}}>AWS Cloud Practitioner</div>
            <h1 style={{fontSize:24,fontWeight:700,color:"#f0f6fc",margin:0}}>Simulacro de Estudio</h1>
            <p style={{fontSize:13,color:"#6e7681",marginTop:8}}>{questions.length} preguntas en {domains.length} dominios</p>
          </div>
          <div style={{display:"grid",gap:8,marginBottom:28}}>
            <button onClick={function(){startQ("all");}} style={{background:"#161b22",border:"1px solid #21262d",borderRadius:10,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
              <div><div style={{fontWeight:600,color:"#58a6ff",fontSize:14}}>Quiz completo</div><div style={{fontSize:12,color:"#6e7681",marginTop:3}}>Intenta responder y luego ve la explicaci\u00f3n</div></div>
              <div style={{fontSize:12,color:"#484f58",fontFamily:"monospace"}}>{questions.length} \u2192</div>
            </button>
            <button onClick={function(){startR("all");}} style={{background:"#161b22",border:"1px solid #21262d",borderRadius:10,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
              <div><div style={{fontWeight:600,color:"#3fb950",fontSize:14}}>Modo repaso</div><div style={{fontSize:12,color:"#6e7681",marginTop:3}}>Ve respuestas y explicaciones directamente</div></div>
              <div style={{fontSize:12,color:"#484f58",fontFamily:"monospace"}}>{questions.length} \u2192</div>
            </button>
          </div>
          <div style={{fontSize:10,letterSpacing:4,color:"#30363d",textTransform:"uppercase",marginBottom:10,fontFamily:"monospace"}}>Por dominio</div>
          <div style={{display:"grid",gap:6}}>
            {domains.map(function(d) {
              var cnt=questions.filter(function(q){return q.domain===d;}).length;
              var c=gc(d);
              return (
                <div key={d} style={{display:"flex",gap:6}}>
                  <button onClick={function(){startQ(d);}} style={{flex:1,background:"#161b22",border:"1px solid #21262d",borderRadius:8,padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:"3px solid "+c,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
                    <span style={{fontSize:13,color:"#c9d1d9"}}>{d}</span>
                    <span style={{fontSize:12,color:"#484f58",fontFamily:"monospace"}}>{String(cnt)}</span>
                  </button>
                  <button onClick={function(){startR(d);}} style={{background:"#161b22",border:"1px solid #21262d",borderRadius:8,padding:"11px 12px",fontSize:12,color:"#6e7681",cursor:"pointer",fontFamily:"inherit"}}>Repasar</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS
  if (mode==="results") {
    var pct=sc.t>0?Math.round(sc.c/sc.t*100):0;
    var pass=pct>=70;
    var wrong=[];
    Object.keys(ans).forEach(function(id){if(!ans[id].ok){var q=questions.find(function(q){return q.id===parseInt(id);});if(q)wrong.push(q);}});
    return (
      <div style={{minHeight:"100vh",background:"#0d1117",color:"#c9d1d9",fontFamily:font,padding:"20px 16px"}}>
        <div style={{maxWidth:500,margin:"0 auto",paddingTop:32}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:52,fontWeight:800,color:pass?"#3fb950":"#f85149",fontFamily:"monospace"}}>{String(pct)+"%"}</div>
            <p style={{fontSize:14,color:"#8b949e",marginTop:10}}>{String(sc.c)+" de "+String(sc.t)+" correctas"}</p>
            <div style={{fontSize:12,color:pass?"#3fb950":"#f85149",marginTop:14,padding:"6px 14px",background:pass?"rgba(63,185,80,0.08)":"rgba(248,81,73,0.08)",borderRadius:20,display:"inline-block",border:"1px solid "+(pass?"rgba(63,185,80,0.2)":"rgba(248,81,73,0.2)")}}>{pass?"Aprobado (umbral: 70%)":"No aprobado (necesitas 70%)"}</div>
          </div>
          {wrong.length>0&&(
            <div style={{marginBottom:24,maxHeight:300,overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:3,color:"#484f58",textTransform:"uppercase",marginBottom:10,fontFamily:"monospace"}}>Preguntas incorrectas ({String(wrong.length)})</div>
              {wrong.map(function(q){return(
                <div key={q.id} style={{background:"#161b22",border:"1px solid #21262d",borderRadius:8,padding:"10px 14px",borderLeft:"3px solid "+gc(q.domain),marginBottom:6}}>
                  <div style={{fontSize:10,color:gc(q.domain),marginBottom:4,fontFamily:"monospace"}}>{q.domain+" - Q"+String(q.id)}</div>
                  <div style={{fontSize:12,color:"#8b949e",lineHeight:1.5}}>{q.q.length>90?q.q.substring(0,90)+"...":q.q}</div>
                </div>
              );})}
            </div>
          )}
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={function(){setMode("menu");}} style={{background:"#161b22",color:"#c9d1d9",border:"1px solid #30363d",borderRadius:8,padding:"10px 20px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Menu</button>
            <button onClick={function(){startQ(selDom);}} style={{background:"#1f6feb",color:"#fff",border:"none",borderRadius:8,padding:"10px 20px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Reintentar</button>
            <button onClick={function(){startR(selDom);}} style={{background:"rgba(63,185,80,0.1)",color:"#3fb950",border:"1px solid rgba(63,185,80,0.2)",borderRadius:8,padding:"10px 20px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Repasar</button>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ
  if (!cur) return null;
  var ng={};
  filt.forEach(function(q,i){if(!ng[q.domain])ng[q.domain]=[];ng[q.domain].push({q:q,i:i});});

  return (
    <div style={{minHeight:"100vh",background:"#0d1117",color:"#c9d1d9",fontFamily:font,padding:"16px"}}>
      <div style={{maxWidth:640,margin:"0 auto",display:"flex",flexDirection:"column",minHeight:"calc(100vh - 32px)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <button onClick={function(){setMode("menu");}} style={{background:"none",border:"none",color:"#6e7681",fontSize:13,cursor:"pointer",fontFamily:"inherit",padding:0}}>{"\u2190 Menu"}</button>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {!rev&&<span style={{fontSize:12,color:"#484f58",fontFamily:"monospace"}}>{String(sc.c)+"/"+String(sc.t)}</span>}
            <button onClick={function(){setNav(!nav);}} style={{background:nav?glow:"#161b22",border:"1px solid "+(nav?accent:"#21262d"),color:nav?accent:"#8b949e",fontSize:12,padding:"5px 10px",borderRadius:6,cursor:"pointer",fontFamily:"monospace"}}>{String(idx+1)+"/"+String(filt.length)+" \u25BE"}</button>
          </div>
        </div>

        {nav&&(
          <div style={{background:"#161b22",border:"1px solid #21262d",borderRadius:10,padding:14,marginBottom:14,maxHeight:340,overflowY:"auto"}}>
            {Object.keys(ng).map(function(dom){
              var items=ng[dom];var dc=gc(dom);
              return(
                <div key={dom} style={{marginBottom:14}}>
                  <div style={{fontSize:10,letterSpacing:2,color:dc,textTransform:"uppercase",marginBottom:6,fontFamily:"monospace"}}>{dom}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {items.map(function(it){
                      var a=ans[it.q.id];var ic=it.i===idx;
                      var bg="#0d1117",bd="#21262d",cl="#6e7681";
                      if(ic){bg=glow;bd=accent;cl="#e6edf3";}
                      else if(a&&a.ok){bg="rgba(63,185,80,0.08)";bd="rgba(63,185,80,0.3)";cl="#3fb950";}
                      else if(a&&!a.ok){bg="rgba(248,81,73,0.08)";bd="rgba(248,81,73,0.3)";cl="#f85149";}
                      else if(rev&&it.i<idx){bg="rgba(63,185,80,0.05)";bd="rgba(63,185,80,0.15)";cl="#3fb950";}
                      return <button key={it.i} onClick={function(){goTo(it.i);}} style={{width:38,height:34,borderRadius:6,background:bg,border:"1px solid "+bd,color:cl,fontSize:12,fontWeight:ic?700:400,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontFamily:"monospace"}}>{String(it.q.id)}</button>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{height:2,background:"#161b22",borderRadius:1,marginBottom:22}}>
          <div style={{height:"100%",background:accent,borderRadius:1,width:((idx+1)/filt.length*100)+"%",transition:"width 0.3s"}}/>
        </div>

        <div style={{fontSize:10,letterSpacing:3,color:accent,textTransform:"uppercase",marginBottom:14,fontFamily:"monospace"}}>{cur.domain+" - Pregunta "+String(cur.id)}</div>
        <p style={{fontSize:15,lineHeight:1.75,color:"#f0f6fc",marginBottom:22,marginTop:0}}>{cur.q}</p>

        <div style={{display:"grid",gap:8,marginBottom:22}}>
          {cur.opts.map(function(opt,i){
            var isC=cur.correct.includes(i),isS=sel.includes(i);
            return <button key={i} onClick={function(){if(!rev)tog(i);}} style={oSt(i)}>{opt+(show&&isC?" \u2713":"")+(done&&isS&&!isC?" \u2717":"")}</button>;
          })}
        </div>

        {show&&<Exp pars={cur.explanation} accent={accent}/>}

        <div style={{display:"flex",gap:8,alignItems:"center",marginTop:"auto",position:"sticky",bottom:0,background:"#0d1117",paddingTop:16,paddingBottom:4,zIndex:2}}>
          <button onClick={prv} disabled={idx===0} style={{padding:"10px 16px",borderRadius:8,background:"#161b22",border:"1px solid #21262d",color:idx===0?"#21262d":"#8b949e",fontSize:14,cursor:idx===0?"default":"pointer",fontFamily:"inherit"}}>{"\u2190"}</button>
          <div style={{flex:1}}>
            {!rev&&!done&&<button onClick={sub} disabled={sel.length===0} style={{width:"100%",padding:11,borderRadius:8,background:sel.length===0?"#161b22":accent,color:sel.length===0?"#30363d":"#0d1117",fontWeight:600,fontSize:14,cursor:sel.length===0?"default":"pointer",border:"1px solid "+(sel.length===0?"#21262d":accent),fontFamily:"inherit"}}>Verificar</button>}
            {show&&idx<filt.length-1&&<button onClick={nxt} style={{width:"100%",padding:11,borderRadius:8,background:accent,color:"#0d1117",fontWeight:600,fontSize:14,cursor:"pointer",border:"none",fontFamily:"inherit"}}>{"Siguiente \u2192"}</button>}
            {show&&idx===filt.length-1&&<button onClick={function(){if(rev)setMode("menu");else setMode("results");}} style={{width:"100%",padding:11,borderRadius:8,background:accent,color:"#0d1117",fontWeight:600,fontSize:14,cursor:"pointer",border:"none",fontFamily:"inherit"}}>{rev?"Volver al menu":"Ver resultados"}</button>}
          </div>
          <button onClick={function(){if(idx<filt.length-1)goTo(idx+1);}} disabled={idx===filt.length-1} style={{padding:"10px 16px",borderRadius:8,background:"#161b22",border:"1px solid #21262d",color:idx===filt.length-1?"#21262d":"#8b949e",fontSize:14,cursor:idx===filt.length-1?"default":"pointer",fontFamily:"inherit"}}>{"\u2192"}</button>
        </div>
      </div>
    </div>
  );
}
