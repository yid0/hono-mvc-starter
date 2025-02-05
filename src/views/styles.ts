export const footerStyle =`
.footer { 
    display: block;
    background-color: #052096 ;
    position: absolute;
    bottom: 0;
    height: 80px;
    width: 100%;
    padding: 10px;
}

.footer .about { 
    float: right;
    color: white;
    position: relative;
    display: block;
    align-items: center;
    font-size: 0.8rem;
    }
}
`
export const globaleStyles = 
`<style>
    .bg-primary { 
        background : #052096 !important;
    }
    .response { 
        background: #f8f9fa;
        border-radius: 0.375rem;
        padding: 1rem;
        margin-top: 1rem;
        white-space: pre-wrap;
        font-family: monospace;
    }
    .github-star {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: white !important;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        transition: all 0.2s;
    }
    .github-star:hover {
        background: rgba(255, 255, 255, 0.7);
    }


    ${footerStyle}

</style>`;

