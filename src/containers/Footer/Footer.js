import React, { Component } from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
 
export default class Footer extends Component {

  render() {
    return (
        <div className='footer'>
          <div className='container'>
            <div class='content row'>
              <div class='col-6'>
                <p>Harus Bisa adalah platform edukasi yang merevolusi kegiatan belajar mengajar di dalam kelas. Dengan menggunakan Harus Bisa, dosen dapat menguji tingkat pemahaman mahasiswa di setiap sesi secara instan dengan memberikan kuis-kuis singkat yang dinilai secara otomatis. Harus Bisa juga memberikan kesempatan untuk mahasiswa untuk berinteraksi dan berpartisipasi lebih banyak di dalam kelas.</p>
              </div>
              <div class='col-6'>
                <div class='row justify-content-end'>
                  <div class='col-4 links'>
                    <a href='/#top' className='f-link'>Home</a>
                    <a href='/#about' className='f-link'>Kenapa HarusBisa?</a>
                    <a href='/#pricing' className='f-link'>Harga</a>
                  </div>
                  <div class='col-4 links'>
                    <a href='/faq' className='f-link'>Bantuan</a>
                    <a href='/termsandconditions' className='f-link'>Syarat dan Ketentuan</a>
                    <a href='/contactus' className='f-link'>Hubungi Kami</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row content">
                <div className="col">
                  <p>Copyright PT. HarusBisaGroup Indonesia | HarusBisa 2018</p>
                </div>
                <div className='col'>
                  <div class='row justify-content-end'>
                    <div class='col-1'><FaFacebookF/></div>
                    <div class='col-1'><FaTwitter/></div>
                    <div class='col-1'><FaInstagram/></div>
                    <div class='col-1'><FaLinkedinIn/></div>
                  </div> 
                </div>
              </div>
          </div>
        </div>
    );
  }
}