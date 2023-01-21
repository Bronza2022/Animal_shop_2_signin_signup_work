console.log('work');
const $wr = document.querySelector('[data-wr]');
const $modalWr = document.querySelector('[data-modalWr]');
const $modalContent = document.querySelector('[data-modalContent]');

const CREATE_FORM_LS_KEY = 'CREATE_FORM_LS_KEY';

console.log($modalContent, $modalWr);

const getCreateCatFormHTML = () => `<h3 class="text-center mb-3">Create new cat</h3>
<form name="createCatForm">
  <div class="mb-3">
    <input 
    type="number" 
    name="id" 
    placeholder="Id" 
    required 
    class="form-control"/>
  </div>
    <div class="mb-3">
    <input 
    type="text" 
    name="name" 
    placeholder="Name" 
    required
    class="form-control"/>
  </div>
  <div class="mb-3">
    <input 
    type="number" 
    name="age" 
    placeholder="Age" 
    class="form-control"/>
  </div>
  <div class="mb-3">
    <input 
    type="text" 
    name="description" 
    placeholder="Description" 
    class="form-control"/>
  </div>
  <div class="mb-3">
        <input 
        type="text" 
        name="image" 
        placeholder="Image url" 
        class="form-control"/>
      </div>
      <div class="mb-3">
        <input type="range" name="rate" min="1" max="10"/>
      </div>

      <div class="mb-3 form-check">
        <input 
        type="checkbox"
        name="favorite" 
        class="form-check-input" id="exampleCheck1"/>
        <label class="form-check-label" for="exampleCheck1">Favorite</label>
      </div>
      
      <button type="submit" class="btn btn-primary">Add</button>
      </form>`;

const ACTIONS = {
  DETAIL: 'detail',
  DELETE: 'delete',
};

const getCatHTML = (cat) => `
    <div data-cat-id="${cat.id}" class="card mb-3 mx-2" style="width: 15rem">
	<img src="${cat.image}" class="card-img-top" alt="${cat.name}" />
	<div class="card-body">
		<h5 class="card-title">${cat.name}</h5>
		<p class="card-text">
			${cat.description}
		</p>
		<button data-action="${ACTIONS.DETAIL}" type="button" class="btn btn-primary">Detail</button>
		<button data-action="${ACTIONS.DELETE}" type="button" class="btn btn-danger">Delete</button>
	</div>
 </div>
	`;

fetch('https://cats.petiteweb.dev/api/single/bronza2022/show/')
  .then((res) => res.json())
  .then((data) => {
    $wr.insertAdjacentHTML(
      'afterbegin',
      data.map((cat) => getCatHTML(cat)).join(''),
    );
  });

$wr.addEventListener('click', (e) => {
  if (e.target.dataset.action === ACTIONS.DELETE) {
    const $catWr = e.target.closest('[data-cat-id]');
    const catId = $catWr.dataset.catId;

    fetch(`https://cats.petiteweb.dev/api/single/bronza2022/delete/${catId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {
        return $catWr.remove();
      }
      alert(`Удаление кота с id = ${catId} не удалось`);
    });
  }
});

const formatCreateFormData = (formDataObject) => ({
  ...formDataObject,
  id: +formDataObject.id,
  rate: +formDataObject.rate,
  age: +formDataObject.age,
  favorite: !!formDataObject.favorite,
});

const submitCreateCatHandler = (e) => {
  e.preventDefault();

  let formDataObject = formatCreateFormData(Object.fromEntries(new FormData(e.target).entries()));

  formDataObject = fetch('https://cats.petiteweb.dev/api/single/Bronza2022/add/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formDataObject),
  }).then((res) => {
    if (res.status === 200) {
      return $wr.insertAdjacentHTML(
        'afterbegin',
        getCatHTML(formDataObject),
      );
    }
    throw Error('Ошибка при создании кота');
  }).catch(alert);
};

const clickModalWrHandler = (e) => {
  if (e.target === $modalWr) {
    $modalWr.classList.add('hidden');
    $modalWr.removeEventListener('click', clickModalWrHandler);
    $modalContent.innerHTML = '';
  }
};

const openModalHandler = (e) => {
  const targetModalName = e.target.dataset.openmodal;

  if (targetModalName === 'createCat') {
    $modalWr.classList.remove('hidden');
    $modalWr.addEventListener('click', clickModalWrHandler);

    $modalContent.insertAdjacentHTML('afterbegin', getCreateCatFormHTML());
    const $createCatForm = document.forms.createCatForm;

    const dataFromLS = localStorage.getItem(CREATE_FORM_LS_KEY);

    const preparedDataFromLS = dataFromLS && JSON.parse(dataFromLS);

    console.log({ preparedDataFromLS });

    if (preparedDataFromLS) {
      Object.keys(preparedDataFromLS).forEach((key) => {
        $createCatForm[key].value = preparedDataFromLS[key];
      });
    }

    $createCatForm.addEventListener('submit', submitCreateCatHandler);
    $createCatForm.addEventListener('change', () => {
      const formattedData = formatCreateFormData(
        Object.fromEntries(new FormData($createCatForm).entries()),
      );

      localStorage.setItem(CREATE_FORM_LS_KEY, JSON.stringify(formattedData));
    });
  }
};

document.addEventListener('click', openModalHandler);

document.addEventListener('keydown', (e) => {
  console.log(e);

  if (e.key === 'Escape') {
    $modalWr.classList.add('hidden');
    $modalWr.removeEventListener('click', clickModalWrHandler);
    $modalContent.innerHTML = '';
  }
});
