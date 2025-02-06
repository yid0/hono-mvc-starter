import { Data } from '../../types';

export const healthComponent = (props: Data) => {

return`
<div class="card">
    <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">System Health Check</h5>
        <button class="btn btn-outline-primary btn-sm" onclick="callApi('${props.healthUrl}')">
            Check Health Status
        </button>
    </div>
    <div class="card-body">
        <pre id="response" class="response border mb-0"></pre>
    </div>
</div>
`
}