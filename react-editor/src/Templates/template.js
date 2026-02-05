export const defaultTemplate = {
    "root": {
        "props": {}
    },
    "content": [
        {
            "type": "Text",
            "props": {
                "content": "Hello, world",
                "level": "h1",
                "size": "lg",
                "align": "left",
                "className": "text-001",
                "customCss": "",
                "widthUnit": "px",
                "maxWidthValue": 700,
                "maxWidthUnit": "px",
                "minWidthUnit": "px",
                "textColor": "#000000",
                "id": "Text-b8288ae4-ad68-41b2-8b6f-929fb28d4f83"
            }
        },
        {
            "type": "ImageText",
            "props": {
                "imagePosition": "left",
                "gap": 24,
                "paddingY": 24,
                "image": "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg",
                "imageWidth": "50%",
                "imageMaxWidth": 0,
                "imageBorderRadius": 8,
                "imageObjectFit": "cover",
                "title": "This is umang prajapati",
                "subtitle": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nobis, recusandae explicabo quisquam commodi vel animi. A perferendis sit possimus dolorem fugiat reiciendis aliquam sint quibusdam, maiores nihil eligendi repudiandae. Dolor, eius dolorum. Quas adipisci facilis itaque eligendi, quod eveniet blanditiis pariatur vero molestias fugiat necessitatibus placeat illo culpa est doloremque! Odit sunt officiis enim similique commodi, vel culpa exercitationem illo deleniti minima vero dicta quia at ipsum ut quidem magni voluptas quisquam maiores nemo! Minus molestiae fuga architecto, unde eius quo magnam nihil sapiente consequatur odit vero iusto cupiditate earum aut quae labore fugit amet laboriosam! Quos, quod vitae?",
                "titleColor": "#111827",
                "subtitleColor": "#374151",
                "textAlign": "left",
                "textMaxWidth": 500,
                "className": "section-00414",
                "customCss": "",
                "id": "ImageText-744a55eb-bbb0-4b97-95ef-c8d9592a7aee"
            }
        },
        {
            "type": "Accordion",
            "props": {
                "backgroundColor": "#ffffff",
                "itemSpacing": 16,
                "iconPosition": "right",
                "items": [
                    {
                        "id": "acc-1",
                        "title": "Nuevas Historias",
                        "description": "Toyota Colombia impulsa sostenibilidad, innovación y seguridad\n\nAutomotores Toyota Colombia prioriza la sostenibilidad, la innovación y la satisfacción del cliente, con metas claras hacia una movilidad más accesible, segura y respetuosa con el medio ambiente."
                    },
                    {
                        "title": "Noticias",
                        "description": "Combustible sintético: una apuesta de Toyota\n\nToyota apuesta por combustibles sintéticos para un futuro sostenible en la Expo 2025 de Japón"
                    },
                    {
                        "title": "Toyota Gazoo Racing",
                        "description": "Colombia le da la bienvenida a Toyota Gazoo Racing, el equipo de automovilismo y los vehículos ganadores de las competencias más retadoras del mundo!\n"
                    }
                ],
                "id": "Accordion-bc3c543b-6cd8-4e7b-a2a3-cd5fdbce90ec",
                "className": "Test-umang"
            }
        },
        {
            "type": "Grid",
            "props": {
                "columns": 2,
                "gap": 16,
                "alignItems": "center",
                "justifyItems": "start",
                "maxWidth": 1200,
                "padding": 0,
                "className": "test-grid",
                "customCss": "margin:50px 0;",
                "id": "Grid-54dc9cd1-cac1-49ca-aede-ab7f13dfea21"
            }
        },
        {
            "type": "Image",
            "props": {
                "sourceType": "url",
                "className": "image-001",
                "customCss": "",
                "image": "https://toyota.com.co/images/Toyota-Sostenible-002.png",
                "alt": "Image",
                "align": "center",
                "widthUnit": "px",
                "maxWidthValue": 100,
                "maxWidthUnit": "%",
                "heightUnit": "px",
                "maxHeightUnit": "px",
                "objectFit": "contain",
                "objectPosition": "center",
                "overflow": "hidden",
                "borderRadius": 0,
                "id": "Image-f80b1e7f-9ced-447f-8c71-c75b5d5cd60a"
            }
        }
    ],
    "zones": {
        "Grid-54dc9cd1-cac1-49ca-aede-ab7f13dfea21:grid-zone": [
            {
                "type": "Button",
                "props": {
                    "text": "Buscar",
                    "type": "info",
                    "href": "",
                    "external": false,
                    "align": "left",
                    "widthUnit": "px",
                    "heightUnit": "px",
                    "maxWidthUnit": "px",
                    "maxHeightUnit": "px",
                    "paddingX": 16,
                    "paddingY": 10,
                    "borderRadius": 6,
                    "className": "button-001",
                    "customCss": "",
                    "id": "Button-5934a64b-00eb-4f13-9f65-80abe477b0f3"
                }
            },
            {
                "type": "Button",
                "props": {
                    "text": "Conoce más",
                    "type": "default",
                    "href": "",
                    "external": false,
                    "align": "left",
                    "widthUnit": "px",
                    "heightUnit": "px",
                    "maxWidthUnit": "px",
                    "maxHeightUnit": "px",
                    "paddingX": 16,
                    "paddingY": 10,
                    "borderRadius": 6,
                    "className": "button-001",
                    "customCss": "",
                    "id": "Button-4379e355-11a7-43fe-8948-e4d5d924c66b"
                }
            }
        ]
    }
}