export class HtmlSanitizer {
    private static readonly UNSAFE_HTML_CHARS: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;'
    };

    private static readonly ALLOWED_TAGS_DEFAULT = [
        'div', 'span', 'p', 'br', 'hr',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'b', 'strong', 'i', 'em',
        'pre', 'code',
        'button', 'small'
    ];

    /**
     *  escape sensitive HTML characters
     */
    static sanitize(str: string): string {
        return str.replace(/[&<>"'`/]/g, char => this.UNSAFE_HTML_CHARS[char] || char);
    }

    static sanitizeObject<T extends Record<string, any>>(obj: T): T {
        const sanitized = { ...obj };
        Object.entries(sanitized).forEach(([key, value]) => {
            if (typeof value === 'string') {
                sanitized[key] = this.sanitize(value);
            }
        });
        return sanitized;
    }

    /**
     * Remove all HTML tags except the allowed ones
     */
    static allowedTags(html: string, allowedTags: string[] = this.ALLOWED_TAGS_DEFAULT): string {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const sanitizeNode = (node: Node): void => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (!allowedTags.includes(element.tagName.toLowerCase())) {
                    element.replaceWith(document.createTextNode(element.textContent || ''));
                    return;
                }

                // clean attributes
                Array.from(element.attributes).forEach(attr => {
                    if (!['class', 'id', 'style'].includes(attr.name)) {
                        element.removeAttribute(attr.name);
                    }
                });

                // clean children
                Array.from(element.childNodes).forEach(child => sanitizeNode(child));
            }
        };

        Array.from(tempDiv.childNodes).forEach(node => sanitizeNode(node));
        return tempDiv.innerHTML;
    }

    static hasSuspiciousContent(str: string): boolean {
        const suspiciousPatterns = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,  // Scripts
            /on\w+="[^"]*"/g,  // Event handlers
            /javascript:/gi,    // JavaScript protocol
            /data:/gi,          // Data URLs
            /vbscript:/gi      // VBScript protocol
        ];

        return suspiciousPatterns.some(pattern => pattern.test(str));
    }
}
