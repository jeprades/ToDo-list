/**
 * Created by jesica on 7/30/2017.
 */

// GLOBAL VARS

let colorBg;
let arrNotes = []; //Notes (obj) will be store here.


// MEDIA QUERY CSS CHANGES
var mq = window.matchMedia( "(max-width: 768px)" );

if (mq.matches) {

    $(".modal-footer").addClass("text-center");

}


// CHANGE DESIGN

function changeDesign() {

    $("header").removeClass("headerInit").addClass("headerColap");
    $("#colInit").removeClass("col-md-8").addClass("col-md-7");
    $("#colBtn").removeClass("col-md-5").addClass("col-md-3");
    $("#taskBtn").removeClass("btnInit")

}

// NOTE CONSTRUCTOR

function Note (titleVal, descriptionVal, colorBg, done) {

    this.title = titleVal;
    this.description = descriptionVal;
    this.color = colorBg;
    this.done = done;

}

// CREATE NOTE

function createNote() {


    arrNotes.unshift(new Note($("#titleTask").val(), $("#descriptionTask").val(), colorBg, false));

}

// UPDATE NOTE COLOR

function updateColor(element, i) {

    arrNotes[i].color = element.getAttribute("data-color");
    $('[data-toggle="popover"]').popover("hide");
    render();

}

// DELETE NOTE

function deleteNote(i) {

    arrNotes.splice(i, 1);
    render();
}

// DONE NOTE

function doneNote(i) {

    arrNotes[i].done = !arrNotes[i].done;

    if (arrNotes[i].done == true) {

        arrNotes.push(arrNotes.splice(i, 1)[0]);
    } else {
        arrNotes.unshift(arrNotes.splice(i, 1)[0]);
    }
    render();

}

function render() {

    let boxHtml= '';

    for (var i = 0; i < arrNotes.length; i++) {

        // POPOVER FOR COLORS

        const popoverColor =
            `<div class='colors'>
                <button type='button' onclick='updateColor(this, ${i})' data-color='#f6b7b1' class='btn btn-secondary'></button>
                <button type='button' onclick='updateColor(this, ${i})' data-color='#f6dab1' class='btn btn-secondary'></button>
                <button type='button' onclick='updateColor(this, ${i})' data-color='#bdb1f6' class='btn btn-secondary'></button>
                <button type='button' onclick='updateColor(this, ${i})' data-color='#f6b1e9' class='btn btn-secondary'></button>
                <button type='button' onclick='updateColor(this, ${i})' data-color='#f7f7f7' class='btn btn-secondary'></button>
            </div> `;

        // BOX

        boxHtml +=
            `<div class="boxNote ui-state-default" style="background-color: ${arrNotes[i].done ? '#a19f9e' : arrNotes[i].color}" id="${i}">
                <div class="row">
                    <div class="col-md-11 col-sm-12 col-12 ${arrNotes[i].done ? 'doneCss' : ''}">
                        <h3 contenteditable="true" onfocusout="saveEditable(${i})" class="noteTitle edit">${arrNotes[i].title}</h3>
                        <p contenteditable="true" onfocusout="saveEditable(${i})" class="noteDescrip edit">${arrNotes[i].description}</p>
                        <i class="fa fa-arrows" aria-hidden="true"></i>
                    </div>
                    <div class="col-md-1 col-sm-12 col-12">
                        <div id="btnsNote">
                            <button class="btn btn-link" onclick="deleteNote(${i})"><i class="fa fa-trash" aria-hidden="true" title="Delete"></i></button>
                            <button class="btn btn-link colorPopover" type="button" data-toggle="popover" data-container="body" data-placement="bottom" title="Edit:" data-html="true" data-content="${popoverColor}"><i class="fa fa-paint-brush" aria-hidden="true"></i></button>
                            <button class="btn btn-link" onclick='doneNote(${i})'><i class="fa fa-check-square-o faa-wrench animated-hover" aria-hidden="true" title="Done"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    $("#insertBox").html(boxHtml);
    $('[data-toggle="popover"]').popover();
    $("#insertBox").sortable({
        revert: true,
        update: sortDragable,
        cancel: 'input,textarea,button,select,option,[contenteditable]'
    });

}




// UPDATE DRAGABLE ARRAY

function sortDragable() {

    let newArr = [];
    const order = $("#insertBox").sortable('toArray');

    for (let i = 0; i < order.length; i++) {

        newArr.push(arrNotes[order[i]]);
    }

    arrNotes = newArr;
    render();
}


// SAVE NEW INPUTS
function saveEditable(i) {

    arrNotes[i].title = $(".noteTitle")[i].innerText;
    arrNotes[i].description = $(".noteDescrip")[i].innerText;

    render();

}

// RUN WEB
function runWeb() {

    changeDesign();
    createNote();
    render();
}




$(document).ready( function () {

    // COLOR ATTRIBUTE

    $(".btn-toolbar > button").click(function () {
        colorBg = this.getAttribute("data-color");
    });


    // CLEAR MODAL
    $('.modal').on('hidden.bs.modal', function(){
        $(this).find('form')[0].reset();
    });


    // RUN WEB

    $('#addModal').click(runWeb);





});

