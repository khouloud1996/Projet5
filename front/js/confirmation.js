/*    <div class="confirmation">
<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId"><!-- 65431343444684674 --></span></p>
</div>

</div>
</main> */

let params = new URL(document.location).searchParams;
let orderId = params.get("id");

let idProduct = document.querySelector("#orderId");
idProduct.innerText = orderId;

localStorage.clear();