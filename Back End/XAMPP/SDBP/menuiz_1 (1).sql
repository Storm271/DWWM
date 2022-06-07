/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de création :  07/06/2022 11:09:50                      */
/*==============================================================*/


drop table if exists T_D_ADDRESS_ADR;

drop table if exists T_D_EXPEDITIONTYPE_ETY;

drop table if exists T_D_EXPEDITION_EXP;

drop table if exists T_D_ORDERDETAILS_ODT;

drop table if exists T_D_ORDERHEADER_OHR;

drop table if exists T_D_ORDERSTATUS_OSS;

drop table if exists T_D_PAYMENTTYPE_PMT;

drop table if exists T_D_PRODUCTKIT_KIT;

drop table if exists T_D_PRODUCTTYPE_PTY;

drop table if exists T_D_PRODUCT_PRD;

drop table if exists T_D_SUPPLIER_SPL;

drop table if exists T_D_USER_USR;

/*==============================================================*/
/* Table : T_D_ADDRESS_ADR                                      */
/*==============================================================*/
create table T_D_ADDRESS_ADR
(
   ADR_ID               int  not null,
   ADR_FIRSTNAME        varchar(1024) not null,
   ADR_LASTNAME         varchar(1024) not null,
   ADR_LINE1            varchar(1024) not null,
   ADR_LINE2            varchar(1024),
   ADR_LINE3            varchar(1024),
   ADR_ZIPCODE          varchar(1024) not null,
   ADR_CITY             varchar(1024) not null,
   ADR_COUNTRY          varchar(1024) not null,
   ADR_MAIL             varchar(1024) not null,
   ADR_PHONE            varchar(1024) not null,
   primary key (ADR_ID)
);

ALTER TABLE T_D_ADDRESS_ADR MODIFY COLUMN ADR_ID int AUTO_INCREMENT;


/*==============================================================*/
/* Table : T_D_EXPEDITIONTYPE_ETY                               */
/*==============================================================*/
create table T_D_EXPEDITIONTYPE_ETY
(
   ETY_ID               int not null,
   ETY_WORDING          varchar(1024) not null,
   primary key (ETY_ID)
);
ALTER TABLE T_D_EXPEDITIONTYPE_ETY MODIFY COLUMN ETY_ID int AUTO_INCREMENT;
/*==============================================================*/
/* Table : T_D_EXPEDITION_EXP                                   */
/*==============================================================*/
create table T_D_EXPEDITION_EXP
(
   EXP_ID               int not null,
   EXP_WEIGTH           decimal(8,2),
   EXP_TRACKINGNUMBER   varchar(1024),
   EXP_SENTDATE         timestamp,
   primary key (EXP_ID)
);
ALTER TABLE T_D_EXPEDITION_EXP MODIFY COLUMN EXP_ID int AUTO_INCREMENT;
/*==============================================================*/
/* Table : T_D_ORDERDETAILS_ODT                                 */
/*==============================================================*/
create table T_D_ORDERDETAILS_ODT
(
   OHR_ID               int not null,
   PRD_ID               int not null,
   EXP_ID               int not null,
   ODT_QUANTITY         int not null,
   ODT_ISCANCELED       smallint not null,
   primary key (OHR_ID, PRD_ID, EXP_ID)
);

/*==============================================================*/
/* Table : T_D_ORDERHEADER_OHR                                  */
/*==============================================================*/
create table T_D_ORDERHEADER_OHR
(
   OHR_ID               int not null,
   ADR_ID_LIV           int not null,
   ADR_ID_FAC           int not null,
   PMT_ID               int not null,
   OSS_ID               int not null,
   ETY_ID               int not null,
   USR_ID               int not null,
   OHR_NUMBER           varchar(1024) not null,
   OHR_DATE             timestamp not null,
   primary key (OHR_ID)
);
ALTER TABLE T_D_ORDERHEADER_OHR MODIFY COLUMN OHR_ID int AUTO_INCREMENT;
/*==============================================================*/
/* Table : T_D_ORDERSTATUS_OSS                                  */
/*==============================================================*/
create table T_D_ORDERSTATUS_OSS
(
   OSS_ID               int not null,
   OSS_WORDING          varchar(1024) not null,
   primary key (OSS_ID)
);
ALTER TABLE T_D_ORDERSTATUS_OSS MODIFY COLUMN OSS_ID int AUTO_INCREMENT;
/*==============================================================*/
/* Table : T_D_PAYMENTTYPE_PMT                                  */
/*==============================================================*/
create table T_D_PAYMENTTYPE_PMT
(
   PMT_ID               int not null,
   PMT_WORDING          varchar(1024) not null,
   primary key (PMT_ID)
);
ALTER TABLE T_D_PAYMENTTYPE_PMT MODIFY COLUMN PMT_ID int AUTO_INCREMENT;
/*==============================================================*/
/* Table : T_D_PRODUCTKIT_KIT                                   */
/*==============================================================*/
create table T_D_PRODUCTKIT_KIT
(
   PRD_ID_KIT           int not null,
   PRD_ID_COMPONENT     int not null,
   KIT_QUANTITY         int not null,
   primary key (PRD_ID_KIT, PRD_ID_COMPONENT)
);

/*==============================================================*/
/* Table : T_D_PRODUCTTYPE_PTY                                  */
/*==============================================================*/
create table T_D_PRODUCTTYPE_PTY
(
   PTY_ID               int not null,
   PTY_DESCRIPTION      varchar(1024),
   primary key (PTY_ID)
);
ALTER TABLE T_D_PRODUCTTYPE_PTY MODIFY COLUMN PTY_ID int AUTO_INCREMENT;
/*==============================================================*/
/* Table : T_D_PRODUCT_PRD                                      */
/*==============================================================*/
create table T_D_PRODUCT_PRD
(
   PRD_ID               int not null,
   SPL_ID               int not null,
   PTY_ID               int not null,
   PRD_DESCRIPTION      varchar(1024) not null,
   PRD_GUARANTEE        smallint not null,
   PRD_PICTURE          longblob,
   PRD_PRICE            decimal(8,2),
   primary key (PRD_ID)
);
ALTER TABLE T_D_PRODUCT_PRD MODIFY COLUMN PRD_ID int AUTO_INCREMENT;
/*==============================================================*/
/* Table : T_D_SUPPLIER_SPL                                     */
/*==============================================================*/
create table T_D_SUPPLIER_SPL
(
   SPL_ID               int not null,
   SPL_NAME             varchar(1024),
   primary key (SPL_ID)
);
ALTER TABLE T_D_SUPPLIER_SPL MODIFY COLUMN SPL_ID int AUTO_INCREMENT;
/*==============================================================*/
/* Table : T_D_USER_USR                                         */
/*==============================================================*/
create table T_D_USER_USR
(
   USR_ID               int not null,
   ADR_ID               int,
   USR_MAIL             varchar(1024) not null,
   USR_PASSWORD         varchar(1024) not null,
   USR_FIRSTNAME        varchar(1024) not null,
   USR_LASTNAME         varchar(1024) not null,
   primary key (USR_ID)
);
ALTER TABLE T_D_USER_USR MODIFY COLUMN USR_ID int AUTO_INCREMENT;

alter table T_D_ORDERDETAILS_ODT add constraint FK_CONCERNE1 foreign key (OHR_ID)
      references T_D_ORDERHEADER_OHR (OHR_ID) on delete restrict on update restrict;

alter table T_D_ORDERDETAILS_ODT add constraint FK_CONCERNE2 foreign key (PRD_ID)
      references T_D_PRODUCT_PRD (PRD_ID) on delete restrict on update restrict;

alter table T_D_ORDERDETAILS_ODT add constraint FK_CONCERNE3 foreign key (EXP_ID)
      references T_D_EXPEDITION_EXP (EXP_ID) on delete restrict on update restrict;

alter table T_D_ORDERHEADER_OHR add constraint FK_A_POUR_PAIEMENT foreign key (PMT_ID)
      references T_D_PAYMENTTYPE_PMT (PMT_ID) on delete restrict on update restrict;

alter table T_D_ORDERHEADER_OHR add constraint FK_A_POUR_STATUT foreign key (OSS_ID)
      references T_D_ORDERSTATUS_OSS (OSS_ID) on delete restrict on update restrict;

alter table T_D_ORDERHEADER_OHR add constraint FK_A_POUR_TYPE_EXPEDITION foreign key (ETY_ID)
      references T_D_EXPEDITIONTYPE_ETY (ETY_ID) on delete restrict on update restrict;

alter table T_D_ORDERHEADER_OHR add constraint FK_COMMANDE foreign key (USR_ID)
      references T_D_USER_USR (USR_ID) on delete restrict on update restrict;

alter table T_D_ORDERHEADER_OHR add constraint FK_EST_FACTURE foreign key (ADR_ID_FAC)
      references T_D_ADDRESS_ADR (ADR_ID) on delete restrict on update restrict;

alter table T_D_ORDERHEADER_OHR add constraint FK_EST_LIVRE foreign key (ADR_ID_LIV)
      references T_D_ADDRESS_ADR (ADR_ID) on delete restrict on update restrict;

alter table T_D_PRODUCTKIT_KIT add constraint FK_SE_COMPOSE foreign key (PRD_ID_KIT)
      references T_D_PRODUCT_PRD (PRD_ID) on delete restrict on update restrict;

alter table T_D_PRODUCTKIT_KIT add constraint FK_T_D_PROD_SE_COMPOS_T_D_PROD2 foreign key (PRD_ID_COMPONENT)
      references T_D_PRODUCT_PRD (PRD_ID) on delete restrict on update restrict;

alter table T_D_PRODUCT_PRD add constraint FK_EST_DE_TYPE foreign key (PTY_ID)
      references T_D_PRODUCTTYPE_PTY (PTY_ID) on delete restrict on update restrict;

alter table T_D_PRODUCT_PRD add constraint FK_PROVIENT_DE foreign key (SPL_ID)
      references T_D_SUPPLIER_SPL (SPL_ID) on delete restrict on update restrict;

alter table T_D_USER_USR add constraint FK_T_D_USER_A_COMME_I_T_D_ADDR3 foreign key (ADR_ID)
      references T_D_ADDRESS_ADR (ADR_ID) on delete restrict on update restrict;

