let todos = []

function applySearchFilter() {}

function fetchToDos() {
    return new Promise(function (resolve, reject) {
        setTimeout(function() {
            todos = [{
                titulo: 'Test 1'
            }, {
                titulo: 'Test 2'
            }]
    
            resolve()
        }, 1000)
    })
}

function renderToDos() {
    showLoader()

    fetchToDos().then(function() {
        hideLoader()
    })
}

function openToDoCreator() {}
