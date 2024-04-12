const fs = require("fs");

let creatConfigFilePRRO = function (req, res, next) {
    const dateCreateDoc = require('./createFolder');
    
    const obj = req.body;
    const configFileName = 'psp.FiscalService.dll.config';
    const config = `<?xml version="1.0" encoding="utf-8"?>
<configuration>
        <appSettings>
            <!-- BASIC PREFERENCES -->
            <add key="destination_ip"   value="${obj.ip}" />     <!-- KASSA IP -->
            <add key="service_ip"       value="${obj.ip}" />     <!-- SERVICE IP, SAME AS KASSA IP -->
            <add key="fiscal_number"    value="${obj.fiscalNumber}" />       <!-- FinID -->            
            <add key="connectionString" value="Server=eva${obj.shop}a\\kassa;Database=PRRODB;User Id=sa;Password=123;Connection Timeout=2;" />  <!-- DB CONNECTION PARAM: # - ShopNum  -->  
            <add key="display_port"     value="/dev/ttyS${obj.com - 1}"/>        <!-- DISPLAY COM-PORT: 0 - COM1, 1 - COM2... -->   
            <add key="moneybox_port"    value="/dev/ttyS${obj.com - 1}" />       <!-- MONEYBOX COM-PORT: 0 - COM1, 1 - COM2... --> 
            <add key="shop_id" value="EVA${obj.shop}" />					<!-- SHOPNUM -->
            <add key="kassa_number" value="${obj.crid}" />				<!-- PRRO CRID -->

            <!-- CASH DRAWER ############## -->		
            <!-- TYPE 1				
                <add key="moneybox_type" value="rs232" />	
                <add key="moneybox_speed" value="115200" />
                <add key="impulse_length" value="1200" />
            -->		
            <!-- TYPE 2: impulse_count 20 OR 540 -->
            <add key="moneybox_type" value="rs232c" />
            <add key="moneybox_speed" value="115200" />
            <add key="impulse_count" value="540" />
            <add key="impulse_length" value="100" />
                        

            <!-- ADDITIONAL PREFERENCES -->
            <add key="header_from_dfs" value="true" />
            <add key="ignore_offline_duration" value="true" />
            <add key="db_type" value="mssql" />
            <add key="service_port" value="33373" />
            <add key="request_port" value="8889" />
            <add key="fiscal_type" value="dfs" />
            <add key="fiscal_port" value="/dev/ttyS1" />            
            <add key="fiscal_speed" value="115200" />
            <add key="fiscal_read_timeout" value="2000" />
            <add key="fiscal_write_timeout" value="2000" />
            <add key="disable_warning_fiscal" value="1" />
            <add key="default_payment_type" value="0" />
            <add key="dfs_address_document" value="http://fs.tax.gov.ua:8609/fs/doc" />
            <add key="dfs_address_command" value="http://fs.tax.gov.ua:8609/fs/cmd" />
            <add key="dfs_address_package" value="http://fs.tax.gov.ua:8609/fs/pck" />
            <add key="request_timeout" value="2"/>
            <add key="cert_storage" value="Cert" />
            <add key="auto_return_to_online" value="false" />			
            <add key="cmp_servre_type" value="dfs" />
            <add key="operator_owner" value="99" />
            <add key="tax-0" value="А"/>
            <add key="tax-1" value="Б"/>
            <add key="tax-2" value="В"/>
            <add key="tax-3" value="Г"/>
            <add key="tax-4" value="Д"/>
            <add key="tax_value-0" value="20"/>
            <add key="tax_value-1" value="0"/>
            <add key="tax_value-2" value="7"/>
            <add key="tax_value-3" value="0"/>
            <add key="tax_value-4" value="0"/>
            <add key="tax_depend-0" value=""/>
            <add key="tax_depend-1" value=""/>
            <add key="tax_depend-2" value=""/>
            <add key="tax_depend-3" value=""/>
            <add key="tax_depend-4" value=""/>
            <add key="no_tax-4" value="true"/>
            <!-- dfs printer ##############-->
            <add key="enable_printer_for_dfs" value="true"/>
            <add key="printer_line_width_for_dfs" value="32"/>
            <add key="top_margin" value="1"/>
            <add key="left_margin" value="1"/>
            <add key="alternative_printername_for_dfs" value="PDF" />
            <add key="alternative_printer_type" value="cups" />
            <add key="disable_print_receipt_type" value="1,2,3,4,5,6,7,8,9"/>			
            <add key="save_file_path" value="/home/cashier/PDF/"/>		
            <add key="printer_font_family" value="Nimbus Mono"/>
            <add key="printer_font_size" value="7"/>
            <add key="encoding" value="1251"/>
            <add key="font_type" value="0"/>
            <add key="printer_speed" value="19200"/>            
            <!-- DISPLAY ##############-->
            <add key="display_type" value="dpd201"/>
            <add key="display_speed" value="9600"/>					
            <!-- LOGO ##############-->
            <add key="multiplier" value="400"/> 
            <add key="logo_path" value="/home/cashier/Soft/psp.FiscalService/logo.bmp"/>
            <add key="logo_height" value="40"/>	            
            <add key="standalone" value="1" />
            <add key="wrapper_type" value="exellio" />			
            <add key="wrapper_port" value="9100" />     
            <!-- AUTOUPDATE AND LICENSING ##############-->  
            <add key="auto_update" value="true" />
            <add key="update_url" value="http://license.pc-service.ua" />
            <add key="version_prefix" value="standart" />
            <add key="get_beta_versions" value="0" />
            <add key="token" value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJ1c2VybmFtZSI6InJ1c2giLCJhZGRyZXNzIjoiMTI3LjAuMC4xIiwiZXhwaXJlcyI6IjM5NDAzMjgiLCJjb250cmFjdF9pZCI6IjE1IiwibmJmIjoxNjU4ODM5ODc3LCJleHAiOjE4OTUyNTk1NTcsImlzcyI6IktleWdlbkFwaVNlcnZpY2UiLCJhdWQiOiJLZXlnZW5BcGlTZXJ2aWNlIn0.uijCFZmwl51aO3AZ7CLNKwaHea-PbQN8Kt2jQZoslUk" />			
        </appSettings>
</configuration>`.trim();


    return new Promise((resolve, reject) => {
        fs.writeFile(`./upload/${dateCreateDoc}/EVA${obj.shop}/` + configFileName, config, 'utf8', function (err) {
            if (err) {
                reject(err);
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            } else {
                resolve();
            }
        });
    }).then(() => {
        console.log(`********* File ${configFileName} has been saved for ${'EVA' + obj.shop} *********`);
        next();
    });
};

module.exports = creatConfigFilePRRO;