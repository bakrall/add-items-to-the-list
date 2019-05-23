const addItems = document.querySelector('.add-items'),
	itemsList = document.querySelector('.plates'),
	items = [];

	function addItem(e) {
		e.preventDefault(); //stop the page from reloading on submit
		const text = this.querySelector('[name=item]').value;
		
		const item = {
			text: 'Item Name',
			done: false
		}
	}

	addItems.addEventListener('submit', addItem);

