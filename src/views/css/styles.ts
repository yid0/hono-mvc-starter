export const footerStyle =`
.footer { 
    display: block;
    background-color:rgb(33, 37, 52) ;
    position: relative;
    min-height: 117px;
    height: 100px;
    width: 100%;
    padding: 20px;
}

`
export const globaleStyles = 
`<style>
    .bg-primary { 
        background : #052096 !important;
    }
    .response { 
        min-height: 100px;
        background: #f8f9fa;
        border-radius: 0.375rem;
        display: none;
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
        background: rgba(59, 53, 53, 0.7);
    }
    
    .feedbacks .card-body {
        height: calc(100% - 56px);
        display: flex;
        flex-direction: column;
    }
    .feedbacks .card {
        height: 100%;
        min-height: 540px;
        max-height: 600px;
    } 
    .feedbacks .list-group {
        flex: 1;
        overflow-y: auto;
        padding: 0;
    }
    .feedbacks .list-group-item {
        border-left: 0;
        border-right: 0;
    }
    .feedbacks .list-group-item:first-child {
        border-top: 0;
    }
    .feedbacks .list-group-item:last-child {
        border-bottom: 0;
    }

    ${footerStyle}

</style>`;

