$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 300,
        onStepChanging: function (event, currentIndex, newIndex) { 
            if ( newIndex === 1 ) {
                $('.steps ul').addClass('step-2');
            } else {
                $('.steps ul').removeClass('step-2');
            }
            if ( newIndex === 2 ) {
                $('.steps ul').addClass('step-3');
            } else {
                $('.steps ul').removeClass('step-3');
            }

            if ( newIndex === 3 ) {
                $('.steps ul').addClass('step-4');

            } else {
                $('.steps ul').removeClass('step-4');

            }
            return true; 
        },
        onFinished: function (event, currentIndex) {
      


            var radioinput = document.getElementsByClassName("radioinput");

            var arrAnswer = ['null'];
            for (let i = 0; i < radioinput.length; i++) {
                if (radioinput[i].checked == true) {
                    arrAnswer.push(radioinput[i].value)
                }
            }

            console.log(arrAnswer);
            
            var HTML = "";
            var no = 1;
            if ((jQuery.inArray("symptomscovid", arrAnswer) > 0)) {
                HTML += `<div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">
                                    <span class="badge badge-pill badge-light">`+ no + `</span>
                                Isolasi Diri dengan Orang Lain
                            </h4>
                            <p>Anda harus mencoba untuk menjauh dari orang lain selama setidaknya 7 hari sejak gejala Anda pertama kali muncul. Isolasi
                            Anda dapat berakhir jika gejala Anda membaik secara signifikan dan jika Anda tidak demam selama setidaknya 72 jam tanpa
                            menggunakan obat dan jaga kesehatan. Dengan mengisolasi diri sendiri, Anda dapat memperlambat penyebaran COVID-19 dan melindungi orang
                            lain.</p>
                        </div>`;
                no++;
            } else {



                if ((jQuery.inArray("traveledinternational", arrAnswer) > 0) || (jQuery.inArray("intheregioncovid", arrAnswer) > 0) || (jQuery.inArray("interactioncovid", arrAnswer) > 0) ) {
                    HTML += `<div class="alert alert-info" role="alert">
                            <h4 class="alert-heading">
                                <span class="badge badge-pill badge-light">`+ no + `</span>
                                Isolasi di Rumah
                            </h4>
                            <p>Anda mungkin telah terpapar. Anda harus tinggal di rumah selama 14 hari ke depan dan melihat apakah ada gejala yang
                            muncul. Anda juga harus membatasi kontak Anda dengan orang lain di luar rumah.</p>
                        </div>`;
                    no++;

                    HTML += `<div class="alert alert-info" role="alert">
                            <h4 class="alert-heading">
                                <span class="badge badge-pill badge-light">`+ no + `</span>
                                Monitoring Diri
                            </h4>
                            <p>Perhatikan gejala COVID-19 seperti batuk, demam, dan kesulitan bernapas. Juga, periksa suhu Anda dua kali sehari selama
                            dua minggu. Jika gejalanya memburuk, hubungi dokter Anda.</p>
                        </div>`;
                    no++;

                } else {

                        HTML += `<div class="alert alert-success" role="alert">
                            <h4 class="alert-heading">
                                <span class="badge badge-pill badge-light">`+ no + `</span>
                                Jaga Jarak
                            </h4>
                            <p>
                            Langkah kecil namun penting dapat memperlambat penyebaran COVID-19. Hindari kelompok orang dan jaga jarak enam kaki dari
                            siapa pun yang bukan bagian dari rumah tangga. Terutama hindari yang menunjukkan gejala.</p>
                        </div>`;
                        no++;

                    if (jQuery.inArray("workout", arrAnswer) > 0) {
                        HTML += `<div class="alert alert-success" role="alert">
                            <h4 class="alert-heading">
                                <span class="badge badge-pill badge-light">`+ no + `</span>
                                Tips Keluar Rumah
                            </h4>
                            <p>
                                
                                    Meminimalisir menyentuh benda-benda<br>
                                    Hindari menyentuh wajah<br>
                                    Hindari keramaian<br>
                                    Semprotkan cairan disinfektan keseluruh badan sebelum masuk rumah<br>
                              
                            </p>
                        </div>`;
                        no++;
                    }

                }

            }

            if (jQuery.inArray("commonsick", arrAnswer) > 0) {
                HTML += `<div class="alert alert-info" role="alert">
                            <h4 class="alert-heading">
                                <span class="badge badge-pill badge-light">`+ no + `</span>
                                Bertanya kepada dokter anda
                            </h4>
                            <p>Jika saat ini Anda sedang minum obat resep, Anda harus menghubungi kantor dokter Anda untuk mendapatkan persediaan 30
                            hari.</p>
                        </div>`;
                no++;
            }



            HTML += `<button class="btn btn-info" onclick="cobalagi()">Kembali</button>`;

            $("#result").html(HTML);

            $("form").hide("500");
            $("#result").show("500");
        },
        labels: {
            finish: "Preview",
            next: "Next",
            previous: "Previous"
        }
    });
    // Custom Steps Jquery Steps
    $('.wizard > .steps li a').click(function(){
    	$(this).parent().addClass('checked');
		$(this).parent().prevAll().addClass('checked');
		$(this).parent().nextAll().removeClass('checked');
    });
    // Custom Button Jquery Steps
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    })
    // Checkbox
    $('.checkbox-circle label').click(function(){
        $('.checkbox-circle label').removeClass('active');
        $(this).addClass('active');
    })
})


function radio(node) {

    var pertanyaan = node.parentNode;
    var radios = pertanyaan.getElementsByTagName('input');
    var labels = pertanyaan.getElementsByTagName('label');
    var borders = pertanyaan.getElementsByClassName('radio');

    for (let index = 0; index < radios.length; index++) {
        radios[index].checked = false;
        labels[index].style.color = "gray";
        borders[index].style.borderColor = "gray";
    }

    node.style.borderColor = "#66bef8";

    var label = node.getElementsByTagName('label');
    var radio = node.getElementsByTagName('input');


    if (radio[0].checked == true) {

        label[0].style.color = "gray";
        radio[0].checked = false;

    } else {

        label[0].style.color = "#66bef8";
        radio[0].checked = true;

    }

}

function cobalagi() {
    $("#result").html("");


    $("form").show("500");
    $("#result").hide("500");
}
