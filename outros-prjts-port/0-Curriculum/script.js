// Aguarda o carregamento do html2pdf
window.onload = function() {
    // Configuração do PDF
    document.getElementById("downloadPDF").addEventListener("click", function () {
        // Esconde os botões temporariamente
        document.querySelector('.buttons-container').style.display = 'none';
        
        const element = document.querySelector(".container");
        const options = {
            margin: 0,
            filename: 'curriculo.pdf',
            image: { type: "jpeg", quality: 1 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true,
                letterRendering: true
            },
            jsPDF: { 
                unit: 'px', 
                format: [element.offsetWidth, element.offsetHeight],
                orientation: 'portrait'
            }
        };

        // Gera o PDF
        html2pdf().set(options).from(element).save().then(() => {
            // Mostra os botões novamente após gerar o PDF
            document.querySelector('.buttons-container').style.display = 'flex';
        });
    });

    // Configuração da Impressão
    document.getElementById("printCV").addEventListener("click", function () {
        const printContent = document.querySelector(".container").outerHTML;
        const originalContent = document.body.innerHTML;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Currículo - Impressão</title>
                    <link rel="stylesheet" href="style.css">
                    <style>
                        @media print {
                            body { margin: 0; }
                            .container { margin: 0; box-shadow: none; }
                        }
                    </style>
                </head>
                <body>
                    ${printContent}
                    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
                    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
                </body>
            </html>
        `);
        printWindow.document.close();

        // Espera o carregamento dos ícones
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 1000);
    });
};

// Import HTML2PDF library with better configuration for CV
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
document.head.appendChild(script);

// PDF Generation Configuration
const pdfConfig = {
    margin: 0,
    filename: 'curriculo.pdf',
    image: { 
        type: 'jpeg', 
        quality: 1
    },
    html2canvas: { 
        scale: 4,
        useCORS: true,
        letterRendering: true,
        scrollY: -window.scrollY,
        windowWidth: document.querySelector('.container').offsetWidth,
        windowHeight: document.querySelector('.container').offsetHeight
    },
    jsPDF: { 
        unit: 'px', 
        format: [
            document.querySelector('.container').offsetWidth,
            document.querySelector('.container').offsetHeight
        ],
        orientation: 'portrait',
        hotfixes: ["px_scaling"]
    }
};

// Função para esconder os botões temporariamente
const toggleButtons = (show = true) => {
    const buttons = document.querySelector('.buttons-container');
    buttons.style.display = show ? 'flex' : 'none';
};

// PDF Download Handler
const handlePdfDownload = async () => {
    try {
        const element = document.querySelector('.container');
        if (!element) {
            throw new Error('Container element not found');
        }

        // Hide buttons before capturing
        toggleButtons(false);

        // Show loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.innerHTML = 'Gerando PDF...';
        loadingDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background: rgba(170, 120, 88, 0.9);
            color: white;
            border-radius: 5px;
            z-index: 9999;
            font-family: 'Poppins', sans-serif;
        `;
        document.body.appendChild(loadingDiv);

        // Ensure all images are loaded
        const images = element.getElementsByTagName('img');
        await Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        }));

        // Generate PDF
        await html2pdf()
            .set(pdfConfig)
            .from(element)
            .save()
            .then(() => {
                document.body.removeChild(loadingDiv);
                toggleButtons(true);
            });

    } catch (error) {
        console.error('PDF generation failed:', error);
        alert('Falha ao gerar PDF. Por favor, tente novamente.');
        toggleButtons(true);
    }
};

// Print Handler
const handlePrint = () => {
    try {
        const element = document.querySelector('.container');
        if (!element) {
            throw new Error('Container element not found');
        }

        // Hide buttons before printing
        toggleButtons(false);

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            throw new Error('Pop-up blocked. Please allow pop-ups for printing.');
        }

        // Get all stylesheets from the current page
        const styles = Array.from(document.styleSheets)
            .map(styleSheet => {
                try {
                    return Array.from(styleSheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('');
                } catch (e) {
                    console.warn('Failed to get some styles', e);
                    return '';
                }
            })
            .join('\n');

        // Create print-specific styles
        const printStyles = `
            @media print {
                body { 
                    margin: 0;
                    padding: 0;
                    background: white;
                }
                .container {
                    margin: 0;
                    box-shadow: none;
                }
                @page {
                    margin: 0;
                    size: auto;
                }
            }
        `;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Currículo - Impressão</title>
                    <style>
                        ${styles}
                        ${printStyles}
                    </style>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                </head>
                <body>
                    ${element.outerHTML}
                    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
                    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
                    <script>
                        // Wait for images and icons to load
                        window.onload = () => {
                            setTimeout(() => {
                                window.print();
                                window.close();
                            }, 1000);
                        };
                    </script>
                </body>
            </html>
        `);
        
        printWindow.document.close();
        
        // Restore buttons after printing
        setTimeout(() => {
            toggleButtons(true);
        }, 1000);

    } catch (error) {
        console.error('Printing failed:', error);
        alert('Falha ao imprimir. Por favor, tente novamente.');
        toggleButtons(true);
    }
};

// Event Listeners
document.getElementById('downloadPDF')?.addEventListener('click', handlePdfDownload);
document.getElementById('printCV')?.addEventListener('click', handlePrint);